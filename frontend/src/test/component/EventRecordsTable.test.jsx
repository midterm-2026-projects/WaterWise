import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import EventRecordsTable from "../../components/EventRecordsTable";

const events = [
  { id: 1, title: "Barangay Assembly", schedule: "2026-07-10 - 09:00", location: "Barangay Hall", status: "Upcoming", tags: ["Community"] },
  { id: 2, title: "Water System Maintenance", schedule: "2026-07-15 - 13:00", location: "Purok 3", status: "Scheduled", tags: ["Maintenance"] },
];

describe("EventRecordsTable", () => {
  it("should render Event Records heading", () => {
    // Arrange
    render(<EventRecordsTable events={events} />);

    // Act
    const heading = screen.getByRole("heading", {
      name: /event records/i,
    });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it.each([
    "Event Title",
    "Schedule",
    "Location",
    "Status",
    "Event Tags",
    "Actions",
  ])("should render '%s' table header", (header) => {
    render(<EventRecordsTable events={events} />);

    expect(
      screen.getByRole("columnheader", {
        name: header,
      })
    ).toBeInTheDocument();
  });

  it("should render the sample events", () => {
    // Arrange
    render(<EventRecordsTable events={events} />);

    // Assert
    expect(
      screen.getByText("Barangay Assembly")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Water System Maintenance")
    ).toBeInTheDocument();
  });

  it("should display the event status", () => {
    render(<EventRecordsTable events={events} />);

    expect(
      screen.getByText("Upcoming")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Scheduled")
    ).toBeInTheDocument();
  });

  it("should display the event tags", () => {
    render(<EventRecordsTable events={events} />);

    expect(
      screen.getByText("Community")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Maintenance")
    ).toBeInTheDocument();
  });

  it("should render Edit buttons", () => {
    render(<EventRecordsTable events={events} />);

    const buttons = screen.getAllByRole("button", {
      name: /edit/i,
    });

    expect(buttons).toHaveLength(2);
  });

  it("should render Delete buttons", () => {
    render(<EventRecordsTable events={events} />);

    const buttons = screen.getAllByRole("button", {
      name: /delete/i,
    });

    expect(buttons).toHaveLength(2);
  });

  it("should allow clicking Edit button", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<EventRecordsTable events={events} />);

    const button = screen.getAllByRole("button", {
      name: /edit/i,
    })[0];

    // Act
    await user.click(button);

    // Assert
    expect(button).toBeInTheDocument();
  });

  it("should allow clicking Delete button", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<EventRecordsTable events={events} />);

    const button = screen.getAllByRole("button", {
      name: /delete/i,
    })[0];

    // Act
    await user.click(button);

    // Assert
    expect(button).toBeInTheDocument();
  });
});
