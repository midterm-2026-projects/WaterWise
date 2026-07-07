import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import EventAnnouncementManagement from "../components/EventAnnouncementManagement";

describe("EventAnnouncementManagement", () => {
  it("should render Event Form", () => {
    render(<EventAnnouncementManagement />);

    expect(
      screen.getByRole("heading", {
        name: /create event/i,
      })
    ).toBeInTheDocument();
  });

  it("should render Event Records Table", () => {
    render(<EventAnnouncementManagement />);

    expect(
      screen.getByRole("heading", {
        name: /event records/i,
      })
    ).toBeInTheDocument();
  });

  it("should render Announcement Form", () => {
    render(<EventAnnouncementManagement />);

    expect(
      screen.getByRole("heading", {
        name: /create announcement/i,
      })
    ).toBeInTheDocument();
  });

  it("should render Announcement Page", () => {
    render(<EventAnnouncementManagement />);

    expect(
      screen.getByRole("heading", {
        name: /announcements/i,
      })
    ).toBeInTheDocument();
  });

  it("should render all four sections", () => {
    render(<EventAnnouncementManagement />);

    expect(
      screen.getAllByRole("heading").length
    ).toBeGreaterThanOrEqual(4);
  });
});