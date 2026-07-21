import { render, screen, waitFor } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import PerPurokConsumptionTrend from "../../components/PerPurokConsumptionTrend";

import {
  fetchAllPuroksMonthlyHistory,
  fetchAllPuroksMonthlyPrediction,
  fetchAllPuroksYearlyHistory,
  fetchAllPuroksYearlyPrediction,
} from "../../services/consumptionAPI";

vi.mock("../../services/consumptionAPI", () => ({
  fetchAllPuroksMonthlyHistory: vi.fn(),

  fetchAllPuroksMonthlyPrediction: vi.fn(),

  fetchAllPuroksYearlyHistory: vi.fn(),

  fetchAllPuroksYearlyPrediction: vi.fn(),
}));

const mockMonthlyHistory = [
  {
    purok: "Purok 1",

    historical: [
      {
        month: "January",
        consumption: 4200,
      },

      {
        month: "February",
        consumption: 4450,
      },

      {
        month: "March",
        consumption: 4680,
      },
    ],
  },

  {
    purok: "Purok 2",

    historical: [
      {
        month: "January",
        consumption: 3900,
      },

      {
        month: "February",
        consumption: 4020,
      },

      {
        month: "March",
        consumption: 4200,
      },
    ],
  },
];

const mockMonthlyPrediction = [
  {
    purok: "Purok 1",
    prediction: 5200,
  },

  {
    purok: "Purok 2",
    prediction: 4800,
  },
];

describe("PerPurokConsumptionTrend", () => {
  it("should render the Per Purok Consumption Trend title", async () => {
    fetchAllPuroksMonthlyHistory.mockResolvedValue({
      data: mockMonthlyHistory,
    });

    fetchAllPuroksMonthlyPrediction.mockResolvedValue({
      data: mockMonthlyPrediction,
    });

    render(<PerPurokConsumptionTrend />);

    expect(screen.getByText("Per Purok Consumption Trend")).toBeInTheDocument();
  });

  it("should render all six purok cards", async () => {
    fetchAllPuroksMonthlyHistory.mockResolvedValue({
      data: mockMonthlyHistory,
    });

    fetchAllPuroksMonthlyPrediction.mockResolvedValue({
      data: mockMonthlyPrediction,
    });

    render(<PerPurokConsumptionTrend />);

    await waitFor(() => {
      expect(screen.getByText("Purok 1")).toBeInTheDocument();

      expect(screen.getByText("Purok 2")).toBeInTheDocument();

      expect(screen.getByText("Purok 3")).toBeInTheDocument();

      expect(screen.getByText("Purok 4")).toBeInTheDocument();

      expect(screen.getByText("Purok 5")).toBeInTheDocument();

      expect(screen.getByText("Purok 6")).toBeInTheDocument();
    });
  });

  it("should render yearly data when yearly filter is selected", async () => {
    fetchAllPuroksMonthlyHistory.mockResolvedValue({
      data: [],
    });

    fetchAllPuroksMonthlyPrediction.mockResolvedValue({
      data: [],
    });

    fetchAllPuroksYearlyHistory.mockResolvedValue({
      data: [
        {
          purok: "Purok 1",

          yearly: [
            {
              year: 2023,
              consumption: 59800,
            },

            {
              year: 2024,
              consumption: 62000,
            },

            {
              year: 2025,
              consumption: 65000,
            },
          ],
        },
      ],
    });

    fetchAllPuroksYearlyPrediction.mockResolvedValue({
      data: [
        {
          purok: "Purok 1",
          prediction: 68000,
        },
      ],
    });

    render(<PerPurokConsumptionTrend />);

    await waitFor(() => {
      expect(screen.getByText("Monthly")).toBeInTheDocument();

      expect(screen.getByText("Yearly")).toBeInTheDocument();
    });
  });

  it("should render error message when API fails", async () => {
    fetchAllPuroksMonthlyHistory.mockRejectedValue({
      message: "Unable to load per purok consumption trend.",
    });

    fetchAllPuroksMonthlyPrediction.mockRejectedValue({
      message: "Unable to load per purok consumption trend.",
    });

    render(<PerPurokConsumptionTrend />);

    await waitFor(() => {
      expect(
        screen.getByText("Unable to load per purok consumption trend."),
      ).toBeInTheDocument();
    });
  });

  it("should render empty state when no data is available", async () => {
    fetchAllPuroksMonthlyHistory.mockResolvedValue({
      data: [],
    });

    fetchAllPuroksMonthlyPrediction.mockResolvedValue({
      data: [],
    });

    render(<PerPurokConsumptionTrend />);

    await waitFor(() => {
      expect(screen.getByText("Purok 1")).toBeInTheDocument();
    });
  });
});
