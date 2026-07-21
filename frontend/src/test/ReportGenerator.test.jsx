import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import ReportGenerator from "../components/ReportGenerator.jsx";

import { generateReport, downloadReportPDF } from "../services/reportAPI.js";

vi.mock("../services/reportAPI.js", () => ({
  generateReport: vi.fn(),

  downloadReportPDF: vi.fn(),
}));

describe("Report Generator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const fillDateFields = () => {
    const dates = screen.getAllByDisplayValue("");

    fireEvent.change(dates[0], {
      target: {
        value: "2026-07-01",
      },
    });

    fireEvent.change(dates[1], {
      target: {
        value: "2026-07-31",
      },
    });
  };

  it("should render report form", () => {
    render(<ReportGenerator />);

    expect(
      screen.getByRole("button", {
        name: "Generate Report",
      }),
    ).toBeInTheDocument();
  });

  it("should generate report successfully", async () => {
    generateReport.mockResolvedValue({
      id: 1,

      title: "Consumption Report",
    });

    render(<ReportGenerator />);

    fillDateFields();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Generate Report",
      }),
    );

    await waitFor(() => {
      expect(generateReport).toHaveBeenCalled();
    });
  });

  it("should display preview after generation", async () => {
    generateReport.mockResolvedValue({
      id: 1,

      title: "Monthly Report",
    });

    render(<ReportGenerator />);

    fillDateFields();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Generate Report",
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Monthly Report")).toBeInTheDocument();
    });
  });

  it("should download generated PDF", async () => {
    generateReport.mockResolvedValue({
      id: 1,

      title: "Report",
    });

    downloadReportPDF.mockResolvedValue(
      new Blob(["pdf"], {
        type: "application/pdf",
      }),
    );

    render(<ReportGenerator />);

    fillDateFields();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Generate Report",
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Report")).toBeInTheDocument();
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /Download PDF/i,
      }),
    );

    await waitFor(() => {
      expect(downloadReportPDF).toHaveBeenCalledWith(1);
    });
  });
});
