import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RecommendationSection from "../components/RecommendationSection";

const recommendations = [
  {
    title: "Reduce Water Loss",
    description:
      "Repair leaking pipelines immediately to minimize water wastage.",
    priority: "High",
  },
  {
    title: "Promote Water Conservation",
    description:
      "Conduct awareness campaigns encouraging responsible water usage.",
    priority: "Medium",
  },
  {
    title: "Increase Water Storage",
    description:
      "Install additional storage tanks to meet future water demand.",
    priority: "Low",
  },
];

const anomalyAlerts = [
  {
    area: "Purok 2",
    message:
      "Water consumption exceeded the expected threshold.",
    severity: "High",
  },
  {
    area: "Purok 5",
    message:
      "Possible pipeline leakage detected.",
    severity: "Critical",
  },
];

describe("RecommendationSection", () => {
  it("It should display the Recommendations section heading.", () => {
    // Arrange
    render(
      <RecommendationSection
        recommendations={recommendations}
        anomalyAlerts={anomalyAlerts}
      />
    );

    // Act
    const heading = screen.getByRole("heading", {
      name: /Recommendations/i,
    });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it("It should render all recommendation cards.", () => {
    // Arrange
    render(
      <RecommendationSection
        recommendations={recommendations}
        anomalyAlerts={anomalyAlerts}
      />
    );

    // Assert
    expect(
      screen.getByText("Reduce Water Loss")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Repair leaking pipelines immediately to minimize water wastage."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("Priority: High")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Promote Water Conservation")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Conduct awareness campaigns encouraging responsible water usage."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("Priority: Medium")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Increase Water Storage")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Install additional storage tanks to meet future water demand."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("Priority: Low")
    ).toBeInTheDocument();
  });

  it("It should render all anomaly alert cards.", () => {
    // Arrange
    render(
      <RecommendationSection
        recommendations={recommendations}
        anomalyAlerts={anomalyAlerts}
      />
    );

    // Assert
    expect(
      screen.getByText("Purok 2")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Water consumption exceeded the expected threshold."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("Severity: High")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Purok 5")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Possible pipeline leakage detected."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("Severity: Critical")
    ).toBeInTheDocument();
  });

  it("It should display the default message when no cards are available.", () => {
    // Arrange
    render(
      <RecommendationSection
        recommendations={[]}
        anomalyAlerts={[]}
      />
    );

    // Act
    const message = screen.getByText(
      "No recommendations or anomaly alerts available."
    );

    // Assert
    expect(message).toBeInTheDocument();
  });
});