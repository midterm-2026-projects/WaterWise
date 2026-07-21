import { render, screen, waitFor } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import YearlyConsumptionTrend from "../../components/YearlyConsumptionTrend";

import {
  fetchYearlyHistory,
  fetchOverallYearlyPrediction,
} from "../../services/consumptionAPI";

vi.mock("../../services/consumptionAPI", () => ({
  fetchYearlyHistory: vi.fn(),

  fetchOverallYearlyPrediction: vi.fn(),
}));

describe("YearlyConsumptionTrend", () => {
  it("should render the Yearly Consumption Trend title", async () => {
    fetchYearlyHistory.mockResolvedValue({
      data: [
        {
          year: 2021,
          consumption: 70120,
        },
      ],
    });

    fetchOverallYearlyPrediction.mockResolvedValue({
      data: {
        prediction: 89320,
        predictionYear: 2026,
      },
    });

    render(<YearlyConsumptionTrend />);

    expect(screen.getByText("Yearly Consumption Trend")).toBeInTheDocument();
  });

  it("should render yearly consumption chart when data is available", async () => {
    fetchYearlyHistory.mockResolvedValue({
      data: [
        {
          year: 2021,
          consumption: 70120,
        },

        {
          year: 2022,
          consumption: 74850,
        },

        {
          year: 2023,
          consumption: 79210,
        },

        {
          year: 2024,
          consumption: 83540,
        },

        {
          year: 2025,
          consumption: 86420,
        },
      ],
    });

    fetchOverallYearlyPrediction.mockResolvedValue({
      data: {
        prediction: 89320,
        predictionYear: 2026,
      },
    });

    render(<YearlyConsumptionTrend />);

    await waitFor(() => {
      expect(fetchYearlyHistory).toHaveBeenCalled();

      expect(fetchOverallYearlyPrediction).toHaveBeenCalled();
    });
  });

  it("should render loading state while fetching yearly consumption data", () => {
    fetchYearlyHistory.mockImplementation(() => new Promise(() => {}));

    fetchOverallYearlyPrediction.mockImplementation(
      () => new Promise(() => {}),
    );

    const { container } = render(<YearlyConsumptionTrend />);

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  })
});
