import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MonthlyConsumptionTrend from "../../components/MonthlyConsumptionTrend";
import { monthlyConsumptionData } from "../../data/analyticsData";

describe("Monthly Consumption", () => {
  it("should render the Monthly Consumption Trend title", () => {
    // Arrange
    render(
      <MonthlyConsumptionTrend
        data={monthlyConsumptionData}
      />
    );

    // Act
    const result = screen.getByText(
      "Monthly Consumption Trend"
    );

    // Assert
    expect(result).toBeInTheDocument();
  });

  it("should render the Monthly Consumption graph when data is available", () => {
    // Arrange
    render(
      <MonthlyConsumptionTrend
        data={monthlyConsumptionData}
      />
    );

    // Act
    const result = screen.getByText(
      "Monthly Consumption Graph"
    );

    // Assert
    expect(result).toBeInTheDocument();
  });

  it("should render the five months of historical consumption data", () => {
    // Arrange
    render(
      <MonthlyConsumptionTrend
        data={monthlyConsumptionData}
      />
    );

    // Assert
    expect(screen.getByText("Jan - 10150 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 10820 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 11240 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 11780 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 12030 m³")).toBeInTheDocument();
  });

  it("should render the predicted monthly consumption value", () => {
    // Arrange
    render(
      <MonthlyConsumptionTrend
        data={monthlyConsumptionData}
      />
    );

    // Assert
    expect(
      screen.getByText("Jun - 12450 m³")
    ).toBeInTheDocument();
  });

  it("should render a default message when no data is available", () => {
    // Arrange
    render(
      <MonthlyConsumptionTrend
        data={[]}
      />
    );

    // Act
    const result = screen.getByText(
      "No monthly consumption data available."
    );

    // Assert
    expect(result).toBeInTheDocument();
  });
});