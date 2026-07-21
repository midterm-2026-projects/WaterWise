import { render, screen, waitFor } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import PurokComparisonChart from "../../components/PurokComparisonChart";

import { fetchAllPuroksMonthlyHistory } from "../../services/consumptionAPI";

vi.mock("../../services/consumptionAPI", () => ({
  fetchAllPuroksMonthlyHistory: vi.fn(),
}));

describe("PurokComparisonChart", () => {
  it("should render the Purok Comparison Chart title", async () => {
    fetchAllPuroksMonthlyHistory.mockResolvedValue({
      data: [
        {
          purok: "Purok 1",

          historical: [
            {
              month: "July",
              year: 2026,
              consumption: 5010,
            },
          ],
        },
      ],
    });

    render(<PurokComparisonChart />);

    expect(screen.getByText("Purok Comparison Chart")).toBeInTheDocument();
  });

  it("should render latest monthly comparison data", async () => {
    fetchAllPuroksMonthlyHistory.mockResolvedValue({
      data: [
        {
          purok: "Purok 1",

          historical: [
            {
              month: "July",
              year: 2026,
              consumption: 5010,
            },
          ],
        },

        {
          purok: "Purok 2",

          historical: [
            {
              month: "July",
              year: 2026,
              consumption: 4550,
            },
          ],
        },

        {
          purok: "Purok 3",

          historical: [
            {
              month: "July",
              year: 2026,
              consumption: 5350,
            },
          ],
        },

        {
          purok: "Purok 4",

          historical: [
            {
              month: "July",
              year: 2026,
              consumption: 4250,
            },
          ],
        },

        {
          purok: "Purok 5",

          historical: [
            {
              month: "July",
              year: 2026,
              consumption: 4790,
            },
          ],
        },

        {
          purok: "Purok 6",

          historical: [
            {
              month: "July",
              year: 2026,
              consumption: 4580,
            },
          ],
        },
      ],
    });

    render(<PurokComparisonChart />);

    await waitFor(() => {
      expect(fetchAllPuroksMonthlyHistory).toHaveBeenCalled();
    });
  });

  it("should render error message when API fails", async () => {
    fetchAllPuroksMonthlyHistory.mockRejectedValue({
      message: "Unable to load purok comparison data.",
    });

    render(<PurokComparisonChart />);

    await waitFor(() => {
      expect(
        screen.getByText("Unable to load purok comparison data."),
      ).toBeInTheDocument();
    });
  });

  it("should render no comparison data message when records are empty", async () => {
    fetchAllPuroksMonthlyHistory.mockResolvedValue({
      data: [],
    });

    render(<PurokComparisonChart />);

    await waitFor(() => {
      expect(
        screen.getByText("No Comparison Data Available"),
      ).toBeInTheDocument();
    });
  });
});
