import { render, screen, waitFor } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import AdminYearlyConsumptionCard from "../../components/AdminYearlyConsumptionCard";

import { fetchOverallYearlyPrediction } from "../../services/consumptionAPI";

vi.mock("../../services/consumptionAPI", () => ({
  fetchOverallYearlyPrediction: vi.fn(),
}));

describe("Admin YearlyConsumptionCard", () => {
  it("should render the overall yearly prediction title", async () => {
    fetchOverallYearlyPrediction.mockResolvedValue({
      data: {
        prediction: 25000,
        predictionYear: 2026,
      },
    });

    render(<AdminYearlyConsumptionCard />);

    const title = await screen.findByText("Overall Yearly Prediction");

    expect(title).toBeInTheDocument();
  });

  it("should render the yearly prediction value correctly", async () => {
    fetchOverallYearlyPrediction.mockResolvedValue({
      data: {
        prediction: 25000,
        predictionYear: 2026,
      },
    });

    render(<AdminYearlyConsumptionCard />);

    await waitFor(() => {
      expect(screen.getByText("25,000")).toBeInTheDocument();
    });
  });

  it("should render the forecast year subtitle", async () => {
    fetchOverallYearlyPrediction.mockResolvedValue({
      data: {
        prediction: 25000,
        predictionYear: 2026,
      },
    });

    render(<AdminYearlyConsumptionCard />);

    await waitFor(() => {
      expect(screen.getByText("Forecast for 2026")).toBeInTheDocument();
    });
  });

  it("should render default forecast subtitle when year is missing", async () => {
    fetchOverallYearlyPrediction.mockResolvedValue({
      data: {
        prediction: 25000,
      },
    });

    render(<AdminYearlyConsumptionCard />);

    await waitFor(() => {
      expect(
        screen.getByText("Overall forecast for next year"),
      ).toBeInTheDocument();
    });
  });

  it("should render zero when prediction value is missing", async () => {
    fetchOverallYearlyPrediction.mockResolvedValue({
      data: {},
    });

    render(<AdminYearlyConsumptionCard />);

    await waitFor(() => {
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  it("should render error message when API fails", async () => {
    fetchOverallYearlyPrediction.mockRejectedValue(
      new Error("Failed loading yearly prediction"),
    );

    render(<AdminYearlyConsumptionCard />);

    const error = await screen.findByText("Failed loading yearly prediction");

    expect(error).toBeInTheDocument();
  });

  it("should render loading state while fetching prediction", () => {
    fetchOverallYearlyPrediction.mockImplementation(
      () => new Promise(() => {}),
    );

    const { container } = render(<AdminYearlyConsumptionCard />);

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
