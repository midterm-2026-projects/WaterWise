import { render, screen, waitFor } from "@testing-library/react";

import { describe, it, expect, vi } from "vitest";

import MonthlyConsumptionTrend from "../../components/MonthlyConsumptionTrend";

import {
  fetchMonthlyHistory,
  fetchOverallMonthlyPrediction,
} from "../../services/consumptionAPI";

vi.mock("../../services/consumptionAPI", () => ({
  fetchMonthlyHistory: vi.fn(),

  fetchOverallMonthlyPrediction: vi.fn(),
}));

describe("Monthly Consumption Trend", () => {
  it("should render the Monthly Consumption Trend title", async () => {
    fetchMonthlyHistory.mockResolvedValue({
      data: [],
    });

    fetchOverallMonthlyPrediction.mockResolvedValue({
      data: {
        prediction: 0,
      },
    });

    render(<MonthlyConsumptionTrend />);

    const result = await screen.findByText("Monthly Consumption Trend");

    expect(result).toBeInTheDocument();
  });

  it("should fetch monthly consumption history and prediction data", async () => {
    fetchMonthlyHistory.mockResolvedValue({
      data: [
        {
          month: "january",
          consumption: 10150,
        },

        {
          month: "february",
          consumption: 10820,
        },

        {
          month: "march",
          consumption: 11240,
        },

        {
          month: "april",
          consumption: 11780,
        },

        {
          month: "may",
          consumption: 12030,
        },
      ],
    });

    fetchOverallMonthlyPrediction.mockResolvedValue({
      data: {
        prediction: 12450,

        month: "june",
      },
    });

    render(<MonthlyConsumptionTrend />);

    await waitFor(() => {
      expect(fetchMonthlyHistory).toHaveBeenCalled();

      expect(fetchOverallMonthlyPrediction).toHaveBeenCalled();
    });
  });

  it("should render the loading state while monthly consumption data is being fetched", () => {
    fetchMonthlyHistory.mockImplementation(() => new Promise(() => {}));

    fetchOverallMonthlyPrediction.mockImplementation(
      () => new Promise(() => {}),
    );

    const { container } = render(<MonthlyConsumptionTrend />);

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("should render an error message when monthly consumption data loading fails", async () => {
    fetchMonthlyHistory.mockRejectedValue(new Error("Failed loading data"));

    fetchOverallMonthlyPrediction.mockResolvedValue({
      data: {
        prediction: 0,
      },
    });

    render(<MonthlyConsumptionTrend />);

    const error = await screen.findByText("Failed loading data");

    expect(error).toBeInTheDocument();
  })
});
