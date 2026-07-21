import { render, screen, waitFor } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import AdminOverallConsumptionCard from "../../components/AdminOverallConsumptionCard";

import { fetchOverallConsumptionHistory } from "../../services/consumptionAPI";

vi.mock("../../services/consumptionAPI", () => ({
  fetchOverallConsumptionHistory: vi.fn(),
}));

describe("AdminOverallConsumptionCard", () => {
  it("should render the overall consumption card correctly", async () => {
    fetchOverallConsumptionHistory.mockResolvedValue({
      data: {
        overallConsumption: 10500,
        recordCount: 10,
      },
    });

    render(<AdminOverallConsumptionCard />);

    const title = screen.getByText("Overall Consumption");

    expect(title).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("10,500")).toBeInTheDocument();

      expect(
        screen.getByText("Total from 10 historical records"),
      ).toBeInTheDocument();
    });
  });

  it("should calculate total consumption from historical records", async () => {
    fetchOverallConsumptionHistory.mockResolvedValue({
      data: [
        {
          consumption: 3000,
        },

        {
          consumption: 4000,
        },

        {
          consumption: 3500,
        },
      ],
    });

    render(<AdminOverallConsumptionCard />);

    await waitFor(() => {
      expect(screen.getByText("10,500")).toBeInTheDocument();

      expect(
        screen.getByText("Total from 3 historical records"),
      ).toBeInTheDocument();
    });
  });

  it("should render zero when no consumption data is available", async () => {
    fetchOverallConsumptionHistory.mockResolvedValue({
      data: [],
    });

    render(<AdminOverallConsumptionCard />);

    await waitFor(() => {
      expect(screen.getByText("0")).toBeInTheDocument();

      expect(
        screen.getByText("Total historical water consumption"),
      ).toBeInTheDocument();
    });
  });

  it("should render error message when loading consumption fails", async () => {
    fetchOverallConsumptionHistory.mockRejectedValue(
      new Error("Failed loading consumption"),
    );

    render(<AdminOverallConsumptionCard />);

    const error = await screen.findByText("Failed loading consumption");

    expect(error).toBeInTheDocument();
  });

  it("should render loading state while fetching data", () => {
    fetchOverallConsumptionHistory.mockImplementation(
      () => new Promise(() => {}),
    );

    const { container } = render(<AdminOverallConsumptionCard />);

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
