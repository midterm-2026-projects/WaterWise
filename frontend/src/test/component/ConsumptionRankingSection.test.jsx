import { render, screen } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import ConsumptionRankingSection from "../../components/ConsumptionRankingSection";

import { fetchConsumptionRanking } from "../../services/consumptionAPI";

vi.mock("../../services/consumptionAPI", () => ({
  fetchConsumptionRanking: vi.fn(),
}));

describe("Consumption Ranking", () => {
  it("should render the Consumption Ranking title", async () => {
    // Arrange
    fetchConsumptionRanking.mockResolvedValue({
      data: [],
    });

    // Act
    render(<ConsumptionRankingSection />);

    // Assert
    const title = await screen.findByText("Consumption Ranking");

    expect(title).toBeInTheDocument();
  });


  it("should render all ranked puroks", async () => {
    // Arrange
    fetchConsumptionRanking.mockResolvedValue({
      data: [
        {
          purok: "Purok 1",
          consumption: 5010,
        },
        {
          purok: "Purok 2",
          consumption: 4550,
        },
        {
          purok: "Purok 3",
          consumption: 5350,
        },
        {
          purok: "Purok 4",
          consumption: 4250,
        },
        {
          purok: "Purok 5",
          consumption: 4790,
        },
        {
          purok: "Purok 6",
          consumption: 4580,
        },
      ],
    });

    // Act
    render(<ConsumptionRankingSection />);

    // Assert
    expect(await screen.findByText("Purok 1")).toBeInTheDocument();
    expect(screen.getByText("Purok 2")).toBeInTheDocument();
    expect(screen.getByText("Purok 3")).toBeInTheDocument();
    expect(screen.getByText("Purok 4")).toBeInTheDocument();
    expect(screen.getByText("Purok 5")).toBeInTheDocument();
    expect(screen.getByText("Purok 6")).toBeInTheDocument();
  });


  it("should render ranking numbers correctly", async () => {
    // Arrange
    fetchConsumptionRanking.mockResolvedValue({
      data: [
        {
          purok: "Purok 1",
          consumption: 5010,
        },
        {
          purok: "Purok 2",
          consumption: 4550,
        },
      ],
    });

    // Act
    render(<ConsumptionRankingSection />);

    // Assert
    expect(await screen.findByText("Rank #1")).toBeInTheDocument();
    expect(screen.getByText("Rank #2")).toBeInTheDocument();
  })

  it("should render error message when ranking loading fails", async () => {
    // Arrange
    fetchConsumptionRanking.mockRejectedValue(
      new Error("Failed loading ranking"),
    );

    // Act
    render(<ConsumptionRankingSection />);

    // Assert
    expect(
      await screen.findByText("Failed loading ranking"),
    ).toBeInTheDocument();
  });


  it("should render default message when no ranking data is available", async () => {
    // Arrange
    fetchConsumptionRanking.mockResolvedValue({
      data: [],
    });

    // Act
    render(<ConsumptionRankingSection />);

    // Assert
    expect(
      await screen.findByText("No Ranking Available"),
    ).toBeInTheDocument();
  });
});