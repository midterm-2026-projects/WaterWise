import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import YearlyConsumptionTrend from "../../components/YearlyConsumptionTrend";
import { yearlyConsumptionData } from "../../data/analyticsData";

describe("Yearly Consumption", () => {
  it("should render the Yearly Consumption Trend title", () => {
    // Arrange
    render(
      <YearlyConsumptionTrend
        data={yearlyConsumptionData}
      />
    );

    // Act
    const result = screen.getByText(
      "Yearly Consumption Trend"
    );

    // Assert
    expect(result).toBeInTheDocument();
  });

  it("should render the Yearly Consumption graph when data is available", () => {
    // Arrange
    render(
      <YearlyConsumptionTrend
        data={yearlyConsumptionData}
      />
    );

    // Act
    const result = screen.getByText(
      "Yearly Consumption Graph"
    );

    // Assert
    expect(result).toBeInTheDocument();
  });

  it("should render the five years of historical consumption data", () => {
    // Arrange
    render(
      <YearlyConsumptionTrend
        data={yearlyConsumptionData}
      />
    );

    // Assert
    expect(screen.getByText("2021 - 70120 m³")).toBeInTheDocument();
    expect(screen.getByText("2022 - 74850 m³")).toBeInTheDocument();
    expect(screen.getByText("2023 - 79210 m³")).toBeInTheDocument();
    expect(screen.getByText("2024 - 83540 m³")).toBeInTheDocument();
    expect(screen.getByText("2025 - 86420 m³")).toBeInTheDocument();
  });

  it("should render the predicted yearly consumption value", () => {
    // Arrange
    render(
      <YearlyConsumptionTrend
        data={yearlyConsumptionData}
      />
    );

    // Assert
    expect(
      screen.getByText("2026 - 89320 m³")
    ).toBeInTheDocument();
  });

  it("should render a default message when no data is available", () => {
    // Arrange
    render(
      <YearlyConsumptionTrend
        data={[]}
      />
    );

    // Act
    const result = screen.getByText(
      "No yearly consumption data available."
    );

    // Assert
    expect(result).toBeInTheDocument();
  });
});