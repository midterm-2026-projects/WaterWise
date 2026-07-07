import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AnnouncementPage from "../components/AnnouncementPage";

describe("AnnouncementPage", () => {
  it("should render the page heading", () => {
    render(<AnnouncementPage />);

    expect(
      screen.getByRole("heading", {
        name: /announcements/i,
      })
    ).toBeInTheDocument();
  });

  it("should render announcement titles", () => {
    render(<AnnouncementPage />);

    expect(
      screen.getByText("Water Interruption Notice")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Barangay Assembly Reminder")
    ).toBeInTheDocument();
  });

  it("should render announcement content", () => {
    render(<AnnouncementPage />);

    expect(
      screen.getByText(
        /Water service will be temporarily unavailable/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Residents are encouraged to attend/i
      )
    ).toBeInTheDocument();
  });

  it("should render publication dates", () => {
    render(<AnnouncementPage />);

    expect(
      screen.getByText(/July 5, 2026/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/July 8, 2026/i)
    ).toBeInTheDocument();
  });

  it("should render related events", () => {
    render(<AnnouncementPage />);

    expect(
      screen.getAllByText(/Barangay Assembly/i)[0]
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Water System Maintenance/i)
    ).toBeInTheDocument();
  });

  it("should render multiple announcements", () => {
    render(<AnnouncementPage />);

    const titles = screen.getAllByRole("heading", {
      level: 3,
    });

    expect(titles).toHaveLength(2);
  });
});