import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "../components/Header";

describe("Header", () => {
  it("should render the title", () => {
    // Arrange
    render(<Header title="Login" />);

    // Act
    const title = screen.getByText("Login");

    // Assert
    expect(title).toBeInTheDocument();
  });
});