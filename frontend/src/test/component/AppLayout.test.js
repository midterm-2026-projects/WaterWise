import React from "react";
import { render, screen } from "@testing-library/react";
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

function renderLayout(pathname) {
  return render(
    React.createElement(
      MemoryRouter,
      { initialEntries: [pathname] },
      React.createElement(
        AppLayout,
        null,
        React.createElement("section", null, "Rendered page content"),
      ),
    ),
  );
}

describe("AppLayout rendering", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
    getCurrentAccount.mockResolvedValue({
      user: { name: "Test Account" },
    });
    fetchNotifications.mockResolvedValue([]);
  });

  it("renders the shared layout and consumer navigation", () => {
    renderLayout("/consumer/usage-metrics");

    expect(screen.getByRole("heading", { name: "WaterWise" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Usage Metrics" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Usage Metrics" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Billing Ledger" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Profile Details" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open system notifications" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Rendered page content")).toBeInTheDocument();
  });

  it("renders the admin page title and navigation", () => {
    renderLayout("/admin/consumers");

    expect(screen.getByRole("heading", { name: "Consumers" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Readings" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Billings" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Announcements" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Open system notifications" }),
    ).not.toBeInTheDocument();
  });

  it("renders the meter-reader navigation", () => {
    renderLayout("/meter-reader/readings-entry");

    expect(screen.getByRole("heading", { name: "Record Consumption Entry" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Record Consumption Entry" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Consumer Directory" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Billing Ledger" })).not.toBeInTheDocument();
  });
});
