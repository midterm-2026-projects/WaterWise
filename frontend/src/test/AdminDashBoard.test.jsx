import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AdminDashboard from "../components/AdminDashboard";

describe("AdminDashboard", () => {
  it("should render the Overall Consumption card", () => {
    // Arrange
    render(<AdminDashboard />);

    // Act
    const overallCard = screen.getByText("Overall Consumption");

    // Assert
    expect(overallCard).toBeInTheDocument();
  });

  it("should render the Monthly Consumption card", () => {
    // Arrange
    render(<AdminDashboard />);

    // Act
    const monthlyCard = screen.getByText("Monthly Consumption");

    // Assert
    expect(monthlyCard).toBeInTheDocument();
  });

  it("should render the Yearly Consumption card", () => {
    // Arrange
    render(<AdminDashboard />);

    // Act
    const yearlyCard = screen.getByText("Yearly Consumption");

    // Assert
    expect(yearlyCard).toBeInTheDocument();
  });

  it("should render the Per Purok Consumption card", () => {
    // Arrange
    render(<AdminDashboard />);

    // Act
    const purokCard = screen.getByText("Per Purok Consumption");

    // Assert
    expect(purokCard).toBeInTheDocument();
  });

  it("should display the correct KPI values", () => {
    // Arrange
    render(<AdminDashboard />);

    // Assert
    expect(screen.getByText("10,500")).toBeInTheDocument();
    expect(screen.getByText("2,300")).toBeInTheDocument();
    expect(screen.getByText("25,000")).toBeInTheDocument();
  });

  it("should display the KPI subtitles", () => {
    // Arrange
    render(<AdminDashboard />);

    // Assert
    expect(
      screen.getByText("Total Water Consumption")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Current Month Consumption")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Current Year Consumption")
    ).toBeInTheDocument();
  });

  it.each([
    "Purok 1",
    "Purok 2",
    "Purok 3",
    "Purok 4",
    "Purok 5",
    "Purok 6",
  ])("should display %s", (purok) => {
    // Arrange
    render(<AdminDashboard />);

    // Act
    const purokName = screen.getByText(purok);

    // Assert
    expect(purokName).toBeInTheDocument();
  });

  it("should render all six puroks", () => {
    // Arrange
    render(<AdminDashboard />);

    // Act
    const puroks = [
      "Purok 1",
      "Purok 2",
      "Purok 3",
      "Purok 4",
      "Purok 5",
      "Purok 6",
    ];

    // Assert
    puroks.forEach((purok) => {
      expect(screen.getByText(purok)).toBeInTheDocument();
    });
  });
});