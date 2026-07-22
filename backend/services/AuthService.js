import { supabase } from "../config/supabase.js";
import { mockUsers } from "../data/mockUserData.js";

const accountSources = [
  { table: "admins", role: "admin", columns: "id, username, email, password, status" },
  { table: "meter_readers", role: "meter-reader", columns: "id, username, email, password, status" },
  { table: "consumers", role: "consumer", columns: "id, username, full_name, email, password, status" },
];

let currentSession = null;

function useTestAccounts() {
  return process.env.NODE_ENV === "test" || process.env.WATERWISE_E2E === "true";
}

function demoAccountsEnabled() {
  return process.env.ENABLE_DEMO_ACCOUNTS === "true";
}

function findMockAccount(identifier) {
  return mockUsers.find(
    (user) => user.email === identifier || user.username === identifier,
  );
}

function invalidCredentialsError() {
  return new Error("Invalid email or password.");
}

async function findAccount(identifier) {
  for (const source of accountSources) {
    for (const column of ["email", "username"]) {
      const { data, error } = await supabase
        .from(source.table)
        .select(source.columns)
        .eq(column, identifier)
        .limit(1)
        .maybeSingle();

      if (error) {
        throw Object.assign(new Error("Unable to verify account credentials."), {
          code: "AUTH_DATABASE_ERROR",
          cause: error,
        });
      }

      if (data) {
        return { ...data, role: source.role };
      }
    }
  }

  return null;
}

export async function loginUser(credentials = {}) {
  const identifier = String(credentials.email ?? credentials.username ?? "").trim();
  const password = String(credentials.password ?? "");

  if (!identifier || !password) {
    throw invalidCredentialsError();
  }

  let account;
  if (useTestAccounts()) {
    account = findMockAccount(identifier);
  } else {
    account = demoAccountsEnabled() ? findMockAccount(identifier) : null;
    account ??= await findAccount(identifier);
  }

  if (!account || account.password !== password) {
    throw invalidCredentialsError();
  }

  if (String(account.status ?? "active").toLowerCase() !== "active") {
    throw new Error("This account is inactive.");
  }

  currentSession = {
    id: account.id,
    name: account.full_name ?? account.name ?? account.username,
    email: account.email,
    role: account.role,
  };

  return currentSession;
}

export async function logoutUser() {
  if (!currentSession) {
    throw new Error("No active session.");
  }

  currentSession = null;
  return { message: "Logout successful." };
}

export async function getCurrentUser() {
  if (!currentSession) {
    throw new Error("Unauthorized.");
  }

  return currentSession;
}

export function isAuthenticated() {
  return currentSession !== null;
}

export function clearSession() {
  currentSession = null;
}
