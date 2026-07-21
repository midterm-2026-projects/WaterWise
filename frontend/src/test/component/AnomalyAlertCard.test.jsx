import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AnomalyAlertCard from "../../components/AnomalyAlertCard";

describe("AnomalyAlertCard", () => {
  it("It should display the affected area.", () => {
    // Arrange
    render(
      <AnomalyAlertCard
        area="Purok 2"
        message="Water consumption exceeded the expected threshold."
        severity="High"
      />
    );

    // Act
    const area = screen.getByText("Purok 2");

    // Assert
    expect(area).toBeInTheDocument();
  });

  it("It should display the anomaly message.", () => {
    // Arrange
    render(
      <AnomalyAlertCard
        area="Purok 2"
        message="Water consumption exceeded the expected threshold."
        severity="High"
      />
    );

    // Act
    const message = screen.getByText(
      "Water consumption exceeded the expected threshold."
    );

    // Assert
    expect(message).toBeInTheDocument();
  });

  it("It should display the severity level.", () => {
    // Arrange
    render(
      <AnomalyAlertCard
        area="Purok 2"
        message="Water consumption exceeded the expected threshold."
        severity="High"
      />
    );

    // Act
    const severity = screen.getByText("Severity: High");

    // Assert
    expect(severity).toBeInTheDocument();
  });

  it("It should display the default anomaly alert values when no data is provided.", () => {
    // Arrange
    render(<AnomalyAlertCard />);

    // Act
    const area = screen.getByText("Unknown Area");

    // Assert
    expect(area).toBeInTheDocument();
    expect(
      screen.getByText("No anomaly detected.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Severity: N/A")
    ).toBeInTheDocument();
  });
});