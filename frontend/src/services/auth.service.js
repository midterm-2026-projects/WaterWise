import { apiRequest } from "./apiClient";

export function login(credentials) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function getCurrentAccount(options) {
  return apiRequest("/api/auth/me", options);
}

export function logout() {
  return apiRequest("/api/auth/logout", { method: "POST" });
}
