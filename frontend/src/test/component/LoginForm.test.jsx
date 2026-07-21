import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import LoginForm from "../../components/LoginForm";

describe("LoginForm", () => {
  it("should login successfully when username and password are correct", async () => {
    // Arrange
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm handleSubmit={handleSubmit} />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    // Act
    await user.type(usernameInput, "admin");
    await user.type(passwordInput, "admin123");
    await user.click(loginButton);

    // Assert
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      username: "admin",
      password: "admin123",
    });
  });

  it("should display error when username is entered without password", async () => {
    // Arrange
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm handleSubmit={handleSubmit} />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    // Act
    await user.type(usernameInput, "admin");
    await user.click(loginButton);

    // Assert
    expect(handleSubmit).not.toHaveBeenCalled();

    expect(
      screen.getByText(/password is required/i)
    ).toBeInTheDocument();
  });

  it("should display error when password is entered without username", async () => {
    // Arrange
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm handleSubmit={handleSubmit} />);

    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    // Act
    await user.type(passwordInput, "admin123");
    await user.click(loginButton);

    // Assert
    expect(handleSubmit).not.toHaveBeenCalled();

    expect(
      screen.getByText(/username is required/i)
    ).toBeInTheDocument();
  });

  it("should display error when username and password are empty", async () => {
    // Arrange
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm handleSubmit={handleSubmit} />);

    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    // Act
    await user.click(loginButton);

    // Assert
    expect(handleSubmit).not.toHaveBeenCalled();

    expect(
      screen.getByText(/username is required/i)
    ).toBeInTheDocument();
  });
});