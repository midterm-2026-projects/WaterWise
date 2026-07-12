export const validateLogin = (credentials) => {

  if (!credentials) {
    throw new Error("Credentials are required.");
  }

  const { email, password } = credentials;

  if (!email || email.trim() === "") {
    throw new Error("Email is required.");
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw new Error("Invalid email format.");
  }

  if (!password || password.trim() === "") {
    throw new Error("Password is required.");
  }

  if (password.length < 6) {
    throw new Error(
      "Password must be at least 6 characters."
    );
  }

  return true;

};