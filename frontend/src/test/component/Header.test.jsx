import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "../../components/Header";

describe("Header", () => {
  it("should render the title", () => {
    // Arrange
    render(<Header title="Login" />);

    // Act
    const title = screen.getByText("Login");

    // Assert
    expect(title).toBeInTheDocument();
  });

  it("places logout inside the account menu", () => {
    const onLogout = vi.fn();
    render(
      <Header
        accountName="Maria Santos"
        activeRoleLabel="Consumer"
        onLogout={onLogout}
      />,
    );

    expect(screen.queryByRole("button", { name: "Log out" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Open account menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Log out" }));

    expect(onLogout).toHaveBeenCalledOnce();
  });
});
