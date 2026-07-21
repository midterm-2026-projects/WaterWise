import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UsageMetrics from "../../pages/UsageMetrics";
import { fetchConsumptionHistory } from "../../services/consumptionHistory.service";

vi.mock("../../services/consumptionHistory.service", () => ({
  fetchConsumptionHistory: vi.fn(),
}));

describe("UsageMetrics API display", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays consumption history retrieved from the API", async () => {
    fetchConsumptionHistory.mockResolvedValue([
      { month: "January 2026", volume: 20 },
      { month: "February 2026", volume: 25.5 },
      { month: "March 2026", volume: 18 },
    ]);

    render(React.createElement(UsageMetrics));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading your consumption history",
    );
    await waitFor(() => {
      expect(screen.getByTestId("stat-total")).toHaveTextContent("63.5");
    });
    expect(screen.getByTestId("balance-amount")).toHaveTextContent("450.00");
    expect(screen.getByTestId("stat-avg")).toHaveTextContent("21.2");
    expect(screen.getByTestId("stat-highest")).toHaveTextContent(
      "February 2026",
    );
    expect(screen.getByText("January 2026")).toBeInTheDocument();
    expect(screen.getByText("March 2026")).toBeInTheDocument();
    expect(fetchConsumptionHistory).toHaveBeenCalledOnce();
  });
});
