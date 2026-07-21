import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import EventForm from "../../components/EventForm";

describe("EventForm", () => {
  it("should render Event Title input", () => {
    // Arrange
    render(<EventForm />);

    // Act
    const input = screen.getByPlaceholderText("Event Title");

    // Assert
    expect(input).toBeInTheDocument();
  });

  it("should render Description textarea", () => {
    // Arrange
    render(<EventForm />);

    // Act
    const textarea = screen.getByPlaceholderText("Event Description");

    // Assert
    expect(textarea).toBeInTheDocument();
  });

  it("should render Date input", () => {
    // Arrange
    const { container } = render(<EventForm />);

    // Act
    const dateInput = container.querySelector('input[type="date"]');

    // Assert
    expect(dateInput).toBeInTheDocument();
  });

  it("should render Time input", () => {
    // Arrange
    const { container } = render(<EventForm />);

    // Act
    const timeInput = container.querySelector('input[type="time"]');

    // Assert
    expect(timeInput).toBeInTheDocument();
  });

  it("should render Location input", () => {
    // Arrange
    render(<EventForm />);

    // Act
    const input = screen.getByPlaceholderText("Location");

    // Assert
    expect(input).toBeInTheDocument();
  });

  it("should render Event Tags input", () => {
    // Arrange
    render(<EventForm />);

    // Act
    const input = screen.getByPlaceholderText("Event Tags");

    // Assert
    expect(input).toBeInTheDocument();
  });

  it("should render Save Event button", () => {
    // Arrange
    render(<EventForm />);

    // Act
    const button = screen.getByRole("button", {
      name: /save event/i,
    });

    // Assert
    expect(button).toBeInTheDocument();
  });

  it("should allow user to type into all fields", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<EventForm />);

    const title = screen.getByPlaceholderText("Event Title");
    const description = screen.getByPlaceholderText("Event Description");
    const location = screen.getByPlaceholderText("Location");
    const tags = screen.getByPlaceholderText("Event Tags");

    // Act
    await user.type(title, "Barangay Assembly");
    await user.type(description, "Monthly meeting");
    await user.type(location, "Barangay Hall");
    await user.type(tags, "Community");

    // Assert
    expect(title).toHaveValue("Barangay Assembly");
    expect(description).toHaveValue("Monthly meeting");
    expect(location).toHaveValue("Barangay Hall");
    expect(tags).toHaveValue("Community");
  });

  it("should submit the form successfully", async () => {
    // Arrange
    const alertMock = vi
      .spyOn(window, "alert")
      .mockImplementation(() => {});

    const user = userEvent.setup();

    render(<EventForm />);

    // Act
    await user.click(
      screen.getByRole("button", {
        name: /save event/i,
      })
    );

    // Assert
    expect(alertMock).toHaveBeenCalled();

    alertMock.mockRestore();
  });
});