import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AnnouncementForm from "../components/AnnouncementForm";

describe("AnnouncementForm", () => {
  it("should render announcement title input", () => {
    // Arrange
    render(<AnnouncementForm />);

    // Act
    const input = screen.getByPlaceholderText("Announcement Title");

    // Assert
    expect(input).toBeInTheDocument();
  });

  it("should render announcement content textarea", () => {
    // Arrange
    render(<AnnouncementForm />);

    // Act
    const textarea = screen.getByPlaceholderText(
      "Announcement Content"
    );

    // Assert
    expect(textarea).toBeInTheDocument();
  });

  it("should render publication date input", () => {
    // Arrange
    render(<AnnouncementForm />);

    // Act
    const dateInput = document.querySelector(
      'input[type="date"]'
    );

    // Assert
    expect(dateInput).toBeInTheDocument();
  });

  it("should render related event dropdown", () => {
    // Arrange
    render(<AnnouncementForm />);

    // Act
    const dropdown = screen.getByRole("combobox");

    // Assert
    expect(dropdown).toBeInTheDocument();
  });

  it("should render publish announcement button", () => {
    // Arrange
    render(<AnnouncementForm />);

    // Act
    const button = screen.getByRole("button", {
      name: /publish announcement/i,
    });

    // Assert
    expect(button).toBeInTheDocument();
  });

  it("should allow user to type announcement title", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<AnnouncementForm />);

    const input = screen.getByPlaceholderText(
      "Announcement Title"
    );

    // Act
    await user.type(
      input,
      "Water Interruption Notice"
    );

    // Assert
    expect(input).toHaveValue(
      "Water Interruption Notice"
    );
  });

  it("should allow user to type announcement content", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<AnnouncementForm />);

    const textarea = screen.getByPlaceholderText(
      "Announcement Content"
    );

    // Act
    await user.type(
      textarea,
      "Water service will be unavailable tomorrow."
    );

    // Assert
    expect(textarea).toHaveValue(
      "Water service will be unavailable tomorrow."
    );
  });

  it("should allow user to select related event", async () => {
    // Arrange
    const user = userEvent.setup();

    render(<AnnouncementForm />);

    const dropdown = screen.getByRole("combobox");

    // Act
    await user.selectOptions(
      dropdown,
      "Barangay Assembly"
    );

    // Assert
    expect(dropdown).toHaveValue(
      "Barangay Assembly"
    );
  });

  it("should submit announcement successfully", async () => {
    // Arrange
    const user = userEvent.setup();

    const alertMock = vi
      .spyOn(window, "alert")
      .mockImplementation(() => {});

    render(<AnnouncementForm />);

    // Act
    await user.click(
      screen.getByRole("button", {
        name: /publish announcement/i,
      })
    );

    // Assert
    expect(alertMock).toHaveBeenCalled();

    alertMock.mockRestore();
  });
});