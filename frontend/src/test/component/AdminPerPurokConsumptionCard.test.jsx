import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import AdminPerPurokConsumptionCard from "../../components/AdminPerPurokConsumptionCard";

import {
  fetchAllPuroksMonthlyPrediction,
  fetchAllPuroksYearlyPrediction,
} from "../../services/consumptionAPI";

vi.mock("../../services/consumptionAPI", () => ({
  fetchAllPuroksMonthlyPrediction: vi.fn(),

  fetchAllPuroksYearlyPrediction: vi.fn(),
}));

describe("AdminPerPurokConsumptionCard", () => {
  it("should render the monthly per purok predicted consumption title", async () => {
    fetchAllPuroksMonthlyPrediction.mockResolvedValue({
      data: [],
    });

    render(<AdminPerPurokConsumptionCard />);

    const title = await screen.findByText(
      "Per Purok Monthly Predicted Consumption",
    );

    expect(title).toBeInTheDocument();
  });

  it("should render all six puroks correctly", async () => {
    fetchAllPuroksMonthlyPrediction.mockResolvedValue({
      data: [
        {
          name: "Purok 1",
          value: 1200,
        },

        {
          name: "Purok 2",
          value: 980,
        },

        {
          name: "Purok 3",
          value: 1150,
        },

        {
          name: "Purok 4",
          value: 890,
        },

        {
          name: "Purok 5",
          value: 760,
        },

        {
          name: "Purok 6",
          value: 1025,
        },
      ],
    });

    render(<AdminPerPurokConsumptionCard />);

    await waitFor(() => {
      expect(screen.getByText("Purok 1")).toBeInTheDocument();

      expect(screen.getByText("Purok 2")).toBeInTheDocument();

      expect(screen.getByText("Purok 3")).toBeInTheDocument();

      expect(screen.getByText("Purok 4")).toBeInTheDocument();

      expect(screen.getByText("Purok 5")).toBeInTheDocument();

      expect(screen.getByText("Purok 6")).toBeInTheDocument();
    });
  });

  it("should render predicted consumption values", async () => {
    fetchAllPuroksMonthlyPrediction.mockResolvedValue({
      data: [
        {
          name: "Purok 1",
          value: 1200,
        },
      ],
    });

    render(<AdminPerPurokConsumptionCard />);

    await waitFor(() => {
      expect(screen.getByText("1,200")).toBeInTheDocument();
    });
  });

  it("should display zero values when prediction data is empty", async () => {
    fetchAllPuroksMonthlyPrediction.mockResolvedValue({
      data: [],
    });

    render(<AdminPerPurokConsumptionCard />);

    await waitFor(() => {
      expect(screen.getAllByText("0")).toHaveLength(6);
    });
  });

  it("should switch to yearly prediction when yearly filter is clicked", async () => {
    fetchAllPuroksMonthlyPrediction.mockResolvedValue({
      data: [],
    });

    fetchAllPuroksYearlyPrediction.mockResolvedValue({
      data: [
        {
          name: "Purok 1",
          value: 15000,
        },
      ],
    });

    render(<AdminPerPurokConsumptionCard />);

    const yearlyButton = screen.getByText("Yearly");

    fireEvent.click(yearlyButton);

    await waitFor(() => {
      expect(fetchAllPuroksYearlyPrediction).toHaveBeenCalled();

      expect(
        screen.getByText("Per Purok Yearly Predicted Consumption"),
      ).toBeInTheDocument();
    });
  });

  it("should render error message when prediction loading fails", async () => {
    fetchAllPuroksMonthlyPrediction.mockRejectedValue(
      new Error("Failed loading prediction"),
    );

    render(<AdminPerPurokConsumptionCard />);

    const error = await screen.findByText("Failed loading prediction");

    expect(error).toBeInTheDocument();
  });

  it("should render loading state while fetching data", () => {
    fetchAllPuroksMonthlyPrediction.mockImplementation(
      () => new Promise(() => {}),
    );

    const { container } = render(<AdminPerPurokConsumptionCard />);

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
