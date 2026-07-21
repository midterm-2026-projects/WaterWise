import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RecommendationCard from "../../components/RecommendationCard";

describe("RecommendationCard", () => {
  it("It should display the recommendation title.", () => {
    // Arrange
    render(
      <RecommendationCard
        title="Reduce Water Loss"
        description="Repair leaking pipelines immediately to minimize water wastage."
        priority="High"
      />
    );

    // Act
    const title = screen.getByText("Reduce Water Loss");

    // Assert
    expect(title).toBeInTheDocument();
  });

  it("It should display the recommendation description.", () => {
    // Arrange
    render(
      <RecommendationCard
        title="Reduce Water Loss"
        description="Repair leaking pipelines immediately to minimize water wastage."
        priority="High"
      />
    );

    // Act
    const description = screen.getByText(
      "Repair leaking pipelines immediately to minimize water wastage."
    );

    // Assert
    expect(description).toBeInTheDocument();
  });

  it("It should display the recommendation priority.", () => {
    // Arrange
    render(
      <RecommendationCard
        title="Reduce Water Loss"
        description="Repair leaking pipelines immediately to minimize water wastage."
        priority="High"
      />
    );

    // Act
    const priority = screen.getByText("Priority: High");

    // Assert
    expect(priority).toBeInTheDocument();
  });

  it("It should display the default recommendation values when no data is provided.", () => {
    // Arrange
    render(<RecommendationCard />);

    // Act
    const title = screen.getByText("No Title");

    // Assert
    expect(title).toBeInTheDocument();
    expect(
      screen.getByText("No description available.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Priority: N/A")
    ).toBeInTheDocument();
  });
});