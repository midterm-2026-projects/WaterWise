import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UsageMetrics from "../../pages/UsageMetrics";

const usageHistory = [
  { month: "January 2025", volume: 12 },
  { month: "February 2025", volume: 18 },
  { month: "January 2026", volume: 20 },
  { month: "February 2026", volume: 25 },
];

describe("UsageMetrics inter-component page", () => {
  it("renders the balance card, analytics summary, and trend graph", () => {
    render(
      React.createElement(UsageMetrics, {
        amountDue: 450,
        usageHistory,
      }),
    );

    expect(screen.getByTestId("balance-amount")).toHaveTextContent("450.00");
    expect(screen.getByTestId("analytics-grid")).toBeInTheDocument();
    expect(screen.getByTestId("stat-total")).toHaveTextContent("75");
    expect(screen.getByTestId("trend-graph-container")).toBeInTheDocument();
  });

  it("updates analytics totals and balance when new usage data arrives", () => {
    const { rerender } = render(
      React.createElement(UsageMetrics, {
        amountDue: 450,
        usageHistory,
      }),
    );

    rerender(
      React.createElement(UsageMetrics, {
        amountDue: 0,
        usageHistory: [
          { month: "March 2026", volume: 10 },
          { month: "April 2026", volume: 15 },
        ],
      }),
    );

    expect(screen.getByTestId("balance-amount")).toHaveTextContent("0.00");
    expect(screen.getByTestId("stat-total")).toHaveTextContent("25");
    expect(screen.getByTestId("stat-highest")).toHaveTextContent("April 2026");
  });

  it("filters the trend graph by selected year", () => {
    render(
      React.createElement(UsageMetrics, {
        amountDue: 450,
        usageHistory,
      }),
    );

    fireEvent.change(screen.getByTestId("year-filter"), {
      target: { value: "2025" },
    });

    expect(screen.getByText("January 2025")).toBeInTheDocument();
    expect(screen.queryByText("January 2026")).not.toBeInTheDocument();
  });

  it("loads and maps the logged-in consumer history from the backend", async () => {
    render(React.createElement(UsageMetrics));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading your consumption history",
    );
    await waitFor(() => {
      expect(screen.getByTestId("stat-total")).toHaveTextContent("435");
    });
    expect(screen.getByText("January 2025")).toBeInTheDocument();
    expect(screen.getAllByText("March 2025")).toHaveLength(2);
  });
});
