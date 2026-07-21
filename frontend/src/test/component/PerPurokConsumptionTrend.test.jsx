import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import PerPurokConsumptionTrend from "../../components/PerPurokConsumptionTrend";
import { purokConsumptionData } from "../../data/analyticsData";

describe("Per Purok Consumption", () => {
  it("should render the Per Purok Consumption Trend title", () => {
    // Arrange
    render(
      <PerPurokConsumptionTrend
        data={purokConsumptionData}
      />
    );

    // Act
    const result = screen.getByText(
      "Per Purok Consumption Trend"
    );

    // Assert
    expect(result).toBeInTheDocument();
  });

  it("should render all six purok forecast cards", () => {
    // Arrange
    render(
      <PerPurokConsumptionTrend
        data={purokConsumptionData}
      />
    );

    // Assert
    expect(
      screen.getByText("Purok 1 Water Consumption Forecast")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 2 Water Consumption Forecast")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 3 Water Consumption Forecast")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 4 Water Consumption Forecast")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 5 Water Consumption Forecast")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 6 Water Consumption Forecast")
    ).toBeInTheDocument();
  });

  it("should render the historical monthly consumption data for all six puroks", () => {
    // Arrange
    render(
      <PerPurokConsumptionTrend
        data={purokConsumptionData}
      />
    );

    // Purok 1
    expect(screen.getByText("Jan - 4200 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 4450 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 4680 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 4820 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 5010 m³")).toBeInTheDocument();

    // Purok 2
    expect(screen.getByText("Jan - 3900 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 4020 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 4200 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 4380 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 4550 m³")).toBeInTheDocument();

    // Purok 3
    expect(screen.getByText("Jan - 4500 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 4680 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 4900 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 5120 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 5350 m³")).toBeInTheDocument();

    // Purok 4
    expect(screen.getByText("Jan - 3700 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 3820 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 3960 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 4100 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 4250 m³")).toBeInTheDocument();

    // Purok 5
    expect(screen.getByText("Jan - 4100 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 4250 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 4420 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 4600 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 4790 m³")).toBeInTheDocument();

    // Purok 6
    expect(screen.getByText("Jan - 4000 m³")).toBeInTheDocument();
    expect(screen.getByText("Feb - 4130 m³")).toBeInTheDocument();
    expect(screen.getByText("Mar - 4280 m³")).toBeInTheDocument();
    expect(screen.getByText("Apr - 4410 m³")).toBeInTheDocument();
    expect(screen.getByText("May - 4580 m³")).toBeInTheDocument();
  });

  it("should render the predicted monthly consumption value for all six puroks", () => {
    // Arrange
    render(
      <PerPurokConsumptionTrend
        data={purokConsumptionData}
      />
    );

    // Assert
    expect(screen.getByText("Jun - 5200 m³")).toBeInTheDocument();
    expect(screen.getByText("Jun - 4800 m³")).toBeInTheDocument();
    expect(screen.getByText("Jun - 6100 m³")).toBeInTheDocument();
    expect(screen.getByText("Jun - 4300 m³")).toBeInTheDocument();
    expect(screen.getByText("Jun - 5600 m³")).toBeInTheDocument();
    expect(screen.getByText("Jun - 4900 m³")).toBeInTheDocument();
  });

  it("should render a default message when no data is available", () => {
    // Arrange
    render(
      <PerPurokConsumptionTrend
        data={{}}
      />
    );

    // Act
    const result = screen.getByText(
      "No purok consumption data available."
    );

    // Assert
    expect(result).toBeInTheDocument();
  });
});