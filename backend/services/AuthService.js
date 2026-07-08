import { mockUsers } from "../data/mockUserData.js";

let currentSession = null;


export const loginUser = async (
  credentials
) => {

  const user =
    mockUsers.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password
    );

  if (!user) {

    throw new Error(
      "Invalid email or password."
    );

  }

  currentSession = {

    id: user.id,

    name: user.name,

    email: user.email,

    role: user.role,

  };


  return currentSession;

};

export const logoutUser = async () => {


  if (!currentSession) {

    throw new Error(
      "No active session."
    );

  }

  currentSession = null;

  return {

    message:
      "Logout successful."

  };

};

export const getCurrentUser = async () => {


  if (!currentSession) {

    throw new Error(
      "Unauthorized."
    );

  }

  return currentSession;

};

export const isAuthenticated = () => {

  return currentSession !== null;

};

export const clearSession = () => {

  currentSession = null;

};