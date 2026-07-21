import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NotificationPage from "../../pages/NotificationPage";

const notifications = [
  {
    id: "bill-1",
    category: "bill",
    title: "New billing generated",
    message: "June 2026 billing is ready.",
    isRead: false,
  },
  {
    id: "announcement-1",
    category: "announcement",
    title: "Maintenance advisory",
    message: "Valve maintenance is scheduled.",
    isRead: false,
  },
];

describe("NotificationPage inter-component page", () => {
  it("renders billing and announcement notifications in separate sections", () => {
    render(React.createElement(NotificationPage, { notifications }));

    const billSection = screen.getByTestId("section-bills");
    const announcementSection = screen.getByTestId("section-announcements");

    expect(within(billSection).getByText("New billing generated")).toBeInTheDocument();
    expect(within(announcementSection).getByText("Maintenance advisory")).toBeInTheDocument();
  });

  it("marks notifications read and triggers direct notification action when clicked", () => {
    const onMarkAsRead = vi.fn();
    const onNotificationClick = vi.fn();

    render(
      React.createElement(NotificationPage, {
        notifications,
        onMarkAsRead,
        onNotificationClick,
      }),
    );

    fireEvent.click(screen.getByTestId("notification-card-bill-1"));

    expect(onMarkAsRead).toHaveBeenCalledWith("bill-1");
    expect(onNotificationClick).toHaveBeenCalledWith(notifications[0]);
  });

  it("updates section content when new notification data arrives", () => {
    const { rerender } = render(
      React.createElement(NotificationPage, { notifications }),
    );

    rerender(
      React.createElement(NotificationPage, {
        notifications: [
          {
            id: "bill-2",
            category: "bill",
            title: "July billing generated",
            message: "July 2026 billing is ready.",
            isRead: false,
          },
        ],
      }),
    );

    expect(screen.getByText("July billing generated")).toBeInTheDocument();
    expect(screen.queryByText("Maintenance advisory")).not.toBeInTheDocument();
    expect(screen.getByTestId("empty-announcements")).toBeInTheDocument();
  });

  it("forwards delete actions from notification cards", () => {
    const onDelete = vi.fn();
    render(React.createElement(NotificationPage, { notifications, onDelete }));

    fireEvent.click(
      screen.getByRole("button", { name: "Delete New billing generated" }),
    );

    expect(onDelete).toHaveBeenCalledWith("bill-1");
  });
});
