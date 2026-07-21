import { render, screen, waitFor } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import AdminMonthlyConsumptionCard from "../../components/AdminMonthlyConsumptionCard";

import { fetchOverallMonthlyPrediction } from "../../services/consumptionAPI";

vi.mock("../../services/consumptionAPI", () => ({
  fetchOverallMonthlyPrediction: vi.fn(),
}));

describe("AdminMonthlyConsumptionCard", () => {
  it("should render monthly prediction correctly", async () => {
    fetchOverallMonthlyPrediction.mockResolvedValue({
      data: {
        prediction: 2300,

        predictionMonth: "August",
      },
    });

    render(<AdminMonthlyConsumptionCard />);

    await waitFor(() => {
      expect(
        screen.getByText("Overall Monthly Prediction"),
      ).toBeInTheDocument();

      expect(screen.getByText("2,300")).toBeInTheDocument();

      expect(screen.getByText("Forecast for August")).toBeInTheDocument();
    });
  });

  it("should render loading state", () => {
    fetchOverallMonthlyPrediction.mockImplementation(
      () => new Promise(() => {}),
    );

    render(<AdminMonthlyConsumptionCard />);

    expect(screen.getByText("Overall Monthly Prediction")).toBeInTheDocument();
  });

  it("should render error message when API fails", async () => {
    fetchOverallMonthlyPrediction.mockRejectedValue({
      message: "Unable to load prediction.",
    });

    render(<AdminMonthlyConsumptionCard />);

    await waitFor(() => {
      expect(
        screen.getByText("Unable to load prediction."),
      ).toBeInTheDocument();
    });
  });

  it("should render zero when prediction is missing", async () => {
    fetchOverallMonthlyPrediction.mockResolvedValue({
      data: {},
    });

    render(<AdminMonthlyConsumptionCard />);

    await waitFor(() => {
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });
});
