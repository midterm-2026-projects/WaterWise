import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, screen, waitFor } from "@testing-library/react";

import Reports from "../pages/Reports";

import { fetchGeneratedReports } from "../services/reportAPI";

vi.mock("../services/reportAPI", () => ({
  fetchGeneratedReports: vi.fn(),
}));

describe("Reports Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render report generation page", async () => {
    fetchGeneratedReports.mockResolvedValue({
      data: [],
    });

    render(<Reports />);

    expect(screen.getByText("Report Generation")).toBeInTheDocument();
  });

  it("should display generated reports", async () => {
    fetchGeneratedReports.mockResolvedValue({
      data: [
        {
          id: 1,

          title: "Monthly Consumption Report",

          created_at: "2026-07-21",
        },
      ],
    });

    render(<Reports />);

    await waitFor(() => {
      expect(
        screen.getByText("Monthly Consumption Report"),
      ).toBeInTheDocument();
    });
  });

  it("should show empty state", async () => {
    fetchGeneratedReports.mockResolvedValue({
      data: [],
    });

    render(<Reports />);

    await waitFor(() => {
      expect(screen.getByText("No reports generated yet.")).toBeInTheDocument();
    });
  });
});
