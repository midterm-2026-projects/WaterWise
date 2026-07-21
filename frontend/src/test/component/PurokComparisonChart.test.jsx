import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import PurokComparisonChart from "../../components/PurokComparisonChart";
import {
  monthlyComparisonData,
  yearlyComparisonData,
} from "../../data/analyticsData";

describe("Purok Comparison Chart Testing", () => {
  it("should render the Purok Comparison Chart title", () => {
    // Arrange
    render(
      <PurokComparisonChart
        data={monthlyComparisonData}
      />
    );

    // Act
    const result = screen.getByText(
      "Purok Comparison Chart"
    );

    // Assert
    expect(result).toBeInTheDocument();
  });

  it("should render the monthly comparison graph", () => {
    // Arrange
    render(
      <PurokComparisonChart
        graphTitle="Monthly Comparison Bar Chart"
        data={monthlyComparisonData}
      />
    );

    // Act
    const result = screen.getByText(
      "Monthly Comparison Bar Chart"
    );

    // Assert
    expect(result).toBeInTheDocument();
  });

  it("should render all puroks monthly comparison data", () => {
    // Arrange
    render(
      <PurokComparisonChart
        data={monthlyComparisonData}
      />
    );

    // Assert
    expect(
      screen.getByText("Purok 1 - 5010 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 2 - 4550 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 3 - 5350 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 4 - 4250 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 5 - 4790 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 6 - 4580 m³")
    ).toBeInTheDocument();
  });

  it("should render all puroks yearly comparison data", () => {
    // Arrange
    render(
      <PurokComparisonChart
        graphTitle="Yearly Comparison Bar Chart"
        data={yearlyComparisonData}
      />
    );

    // Assert
    expect(
      screen.getByText("Purok 1 - 59800 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 2 - 54800 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 3 - 64900 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 4 - 49500 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 5 - 56300 m³")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 6 - 52600 m³")
    ).toBeInTheDocument();
  });

  it("should render a default message when no data is available", () => {
    // Arrange
    render(
      <PurokComparisonChart
        data={[]}
      />
    );

    // Act
    const result = screen.getByText(
      "No purok comparison data available."
    );

    // Assert
    expect(result).toBeInTheDocument();
  });
});