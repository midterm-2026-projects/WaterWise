import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import ConsumptionRankingSection from "../components/ConsumptionRankingSection";
import { monthlyComparisonData } from "../data/analyticsData";

describe("Consumption Ranking", () => {
  it("should render the Consumption Ranking title", () => {
    // Arrange
    render(
      <ConsumptionRankingSection
        data={monthlyComparisonData}
      />
    );

    // Act
    const result = screen.getByText(
      "Consumption Ranking"
    );

    // Assert
    expect(result).toBeInTheDocument();
  });

  it("should render all ranked puroks", () => {
    // Arrange
    render(
      <ConsumptionRankingSection
        data={monthlyComparisonData}
      />
    );

    // Assert
    expect(
      screen.getByText("#1 Purok 1 - 5010 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("#2 Purok 2 - 4550 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("#3 Purok 3 - 5350 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("#4 Purok 4 - 4250 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("#5 Purok 5 - 4790 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("#6 Purok 6 - 4580 m³")
    ).toBeInTheDocument();
  });

  it("should render a default message when no ranking data is available", () => {
    // Arrange
    render(
      <ConsumptionRankingSection
        data={[]}
      />
    );

    // Assert
    expect(
      screen.getByText("No consumption ranking available.")
    ).toBeInTheDocument();
  });
});