import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AppLayout from "../../components/AppLayout";
import { getCurrentAccount } from "../../services/auth.service";
import { fetchNotifications } from "../../services/consumerPortal.service";

vi.mock("../../services/auth.service", () => ({
  getCurrentAccount: vi.fn(),
  logout: vi.fn(),
}));

vi.mock("../../services/consumerPortal.service", () => ({
  deleteNotification: vi.fn(),
  fetchNotifications: vi.fn(),
  markNotificationRead: vi.fn(),
}));

describe("Notification API display", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getCurrentAccount.mockResolvedValue({
      user: { name: "Test Consumer" },
    });
  });

  it("displays notifications retrieved from the API", async () => {
    fetchNotifications.mockResolvedValue([
      {
        id: "bill-1",
        category: "bill",
        title: "New billing generated",
        message: "June 2026 billing is ready.",
        isRead: false,
        actionPath: "/consumer/billing-ledger?receipt=official",
      },
      {
        id: "announcement-1",
        category: "announcement",
        title: "Maintenance advisory",
        message: "Valve maintenance is scheduled.",
        isRead: false,
      },
    ]);

    render(
      React.createElement(
        MemoryRouter,
        { initialEntries: ["/consumer/usage-metrics"] },
        React.createElement(
          AppLayout,
          null,
          React.createElement("div", null, "Consumer dashboard"),
        ),
      ),
    );

    expect(await screen.findByTestId("unread-badge")).toHaveTextContent("2");
    fireEvent.click(screen.getByRole("button", { name: "Open system notifications" }));

    expect(screen.getByText("New billing generated")).toBeInTheDocument();
    expect(screen.getByText("June 2026 billing is ready.")).toBeInTheDocument();
    expect(screen.getByText("Maintenance advisory")).toBeInTheDocument();
    expect(screen.getByText("Valve maintenance is scheduled.")).toBeInTheDocument();
    expect(fetchNotifications).toHaveBeenCalledOnce();
  });
});
