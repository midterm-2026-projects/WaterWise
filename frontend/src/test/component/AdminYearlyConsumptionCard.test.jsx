import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AdminYearlyConsumptionCard from "../../components/AdminYearlyConsumptionCard";

describe("AdminYearlyConsumptionCard", () => {
  it("should render the yearly consumption card correctly", () => {
    render(
      <AdminYearlyConsumptionCard
        value="25,000"
        subtitle="Current Year Consumption"
      />
    );

    expect(
      screen.getByText("Yearly Consumption")
    ).toBeInTheDocument();

    expect(screen.getByText("25,000")).toBeInTheDocument();

    expect(
      screen.getByText("Current Year Consumption")
    ).toBeInTheDocument();
  });

  it("should render default values when no props are provided", () => {
    render(<AdminYearlyConsumptionCard />);

    expect(screen.getByText("0")).toBeInTheDocument();

    expect(
      screen.getByText("No data available")
    ).toBeInTheDocument();
  });

  it("should render the default value when value is missing", () => {
    render(
      <AdminYearlyConsumptionCard
        subtitle="Current Year Consumption"
      />
    );

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should render the default subtitle when subtitle is missing", () => {
    render(
      <AdminYearlyConsumptionCard value="25,000" />
    );

    expect(
      screen.getByText("No data available")
    ).toBeInTheDocument();
  });
});