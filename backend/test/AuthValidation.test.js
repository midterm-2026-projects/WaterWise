import { describe, expect, it } from "vitest";
import { validateLogin } from "/validation/AuthValidation.js";

describe("Authentication Validation", () => {

  it("It should validate correct login credentials.", () => {

    // Arrange

    const credentials = {
      email: "admin@gmail.com",
      password: "password123",
    };

    // Act & Assert

    expect(() =>
      validateLogin(credentials)
    ).not.toThrow();

  });

  it("It should throw an error when credentials are missing.", () => {

    // Arrange

    const credentials = null;

    // Act & Assert

    expect(() =>
      validateLogin(credentials)
    ).toThrow("Credentials are required.");

  });

  it("It should throw an error when email is empty.", () => {

    // Arrange

    const credentials = {
      email: "",
      password: "password123",
    };

    // Act & Assert

    expect(() =>
      validateLogin(credentials)
    ).toThrow("Email is required.");

  });

  it("It should throw an error when email format is invalid.", () => {

    // Arrange

    const credentials = {
      email: "admin",
      password: "password123",
    };

    // Act & Assert

    expect(() =>
      validateLogin(credentials)
    ).toThrow("Invalid email format.");

  });

  it("It should throw an error when password is empty.", () => {

    // Arrange

    const credentials = {
      email: "admin@gmail.com",
      password: "",
    };

    // Act & Assert

    expect(() =>
      validateLogin(credentials)
    ).toThrow("Password is required.");

  });

  it("It should throw an error when password is less than six characters.", () => {

    // Arrange

    const credentials = {
      email: "admin@gmail.com",
      password: "12345",
    };

    // Act & Assert

    expect(() =>
      validateLogin(credentials)
    ).toThrow("Password must be at least 6 characters.");

  });

});