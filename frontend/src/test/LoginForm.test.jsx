import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LoginForm from "../components/LoginForm";

describe("LoginForm", () => {
  it("should render username input field", () => {
    // Arrange
    render(<LoginForm />);

    // Act
    const usernameInput = screen.getByPlaceholderText("Username");

    // Assert
    expect(usernameInput).toBeInTheDocument();
  });

  it("should render password input field", () => {
    // Arrange
    render(<LoginForm />);

    // Act
    const passwordInput = screen.getByPlaceholderText("Password");

    // Assert
    expect(passwordInput).toBeInTheDocument();
  });

  it("should render username input with type text", () => {
    // Arrange
    render(<LoginForm />);

    // Act
    const usernameInput = screen.getByPlaceholderText("Username");

    // Assert
    expect(usernameInput).toHaveAttribute("type", "text");
  });

  it("should render password input with type password", () => {
    // Arrange
    render(<LoginForm />);

    // Act
    const passwordInput = screen.getByPlaceholderText("Password");

    // Assert
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should render both username and password fields", () => {
    // Arrange
    render(<LoginForm />);

    // Act
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    // Assert
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("should render login button", () => {
  render(<LoginForm />);

  const button = screen.getByRole("button", {
    name: /login/i,
  });

  expect(button).toBeInTheDocument();
  });
});