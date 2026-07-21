import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AdminOverallConsumptionCard from "../../components/AdminOverallConsumptionCard";

describe("AdminOverallConsumptionCard", () => {
  it("should render the overall consumption card correctly", () => {
    // Arrange
    render(
      <AdminOverallConsumptionCard
        value="10,500"
        subtitle="Total Water Consumption"
      />
    );

    // Act
    const title = screen.getByText("Overall Consumption");
    const value = screen.getByText("10,500");
    const subtitle = screen.getByText("Total Water Consumption");

    // Assert
    expect(title).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("should render default values when no props are provided", () => {
    render(<AdminOverallConsumptionCard />);

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(
      screen.getByText("No data available")
    ).toBeInTheDocument();
  });

  it("should render the default value when value is missing", () => {
    render(
      <AdminOverallConsumptionCard
        subtitle="Total Water Consumption"
      />
    );

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should render the default subtitle when subtitle is missing", () => {
    render(
      <AdminOverallConsumptionCard value="10,500" />
    );

    expect(
      screen.getByText("No data available")
    ).toBeInTheDocument();
  });
});