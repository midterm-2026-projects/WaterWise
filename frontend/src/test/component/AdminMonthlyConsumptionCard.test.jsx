import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AdminMonthlyConsumptionCard from "../../components/AdminMonthlyConsumptionCard";

describe("AdminMonthlyConsumptionCard", () => {
  it("should render the monthly consumption card correctly", () => {
    render(
      <AdminMonthlyConsumptionCard
        value="2,300"
        subtitle="Current Month Consumption"
      />
    );

    expect(
      screen.getByText("Monthly Consumption")
    ).toBeInTheDocument();

    expect(screen.getByText("2,300")).toBeInTheDocument();

    expect(
      screen.getByText("Current Month Consumption")
    ).toBeInTheDocument();
  });

  it("should render default values when no props are provided", () => {
    render(<AdminMonthlyConsumptionCard />);

    expect(screen.getByText("0")).toBeInTheDocument();

    expect(
      screen.getByText("No data available")
    ).toBeInTheDocument();
  });

  it("should render the default value when value is missing", () => {
    render(
      <AdminMonthlyConsumptionCard
        subtitle="Current Month Consumption"
      />
    );

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should render the default subtitle when subtitle is missing", () => {
    render(
      <AdminMonthlyConsumptionCard value="2,300" />
    );

    expect(
      screen.getByText("No data available")
    ).toBeInTheDocument();
  });
});