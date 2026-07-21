import { render, screen } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import AnomalyRecommendationSection from "../../components/AnomalyRecommendationSection";

import { generateAllAnomalies } from "../../services/anomalyAPI";

import { fetchAllRecommendations } from "../../services/recommendationAPI";

vi.mock("../../services/anomalyAPI", () => ({
  generateAllAnomalies: vi.fn(),
}));

vi.mock("../../services/recommendationAPI", () => ({
  fetchAllRecommendations: vi.fn(),
}));

describe("Anomaly Recommendation Section", () => {
  it("should render AI Analysis title", async () => {
    // Arrange
    generateAllAnomalies.mockResolvedValue({
      data: {
        overallMonthly: {
          summary: "No anomaly detected.",
          status: "normal",
        },
      },
    });

    fetchAllRecommendations.mockResolvedValue({
      data: {
        overallMonthly: {
          recommendations: [],
        },
      },
    });

    // Act
    render(<AnomalyRecommendationSection />);

    // Assert
    expect(await screen.findByText("AI Analysis")).toBeInTheDocument();
  });

  it("should render loading state while generating analysis", () => {
    // Arrange
    generateAllAnomalies.mockImplementation(() => new Promise(() => {}));

    fetchAllRecommendations.mockImplementation(() => new Promise(() => {}));

    // Act
    render(<AnomalyRecommendationSection />);

    // Assert
    expect(screen.getByText("Generating AI analysis...")).toBeInTheDocument();
  });

  it("should render critical anomaly alert when anomaly severity is high", async () => {
    // Arrange
    generateAllAnomalies.mockResolvedValue({
      data: {
        overallMonthly: {
          summary: "High water consumption detected.",
          status: "high",
        },
      },
    });

    fetchAllRecommendations.mockResolvedValue({
      data: {
        overallMonthly: {
          recommendations: [],
        },
      },
    });

    // Act
    render(<AnomalyRecommendationSection />);

    // Assert
    expect(
      await screen.findByText("Critical Anomaly Detection"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("High water consumption detected."),
    ).toBeInTheDocument();
  });

  it("should render AI recommendations", async () => {
    // Arrange
    generateAllAnomalies.mockResolvedValue({
      data: {
        overallMonthly: {
          summary: "Normal consumption.",
          status: "normal",
        },
      },
    });

    fetchAllRecommendations.mockResolvedValue({
      data: {
        overallMonthly: {
          recommendations: [
            {
              title: "Reduce water usage",
              description: "Monitor household consumption during peak hours.",
            },
          ],
        },
      },
    });

    // Act
    render(<AnomalyRecommendationSection />);

    // Assert
    expect(await screen.findByText("AI Recommendations")).toBeInTheDocument();

    expect(screen.getByText("Reduce water usage")).toBeInTheDocument();

    expect(
      screen.getByText("Monitor household consumption during peak hours."),
    ).toBeInTheDocument();
  });

  it("should render purok monthly analysis label", async () => {
    // Arrange
    generateAllAnomalies.mockResolvedValue({
      data: {
        allPuroksMonthly: [
          {
            purok: "Purok 1",
            summary: "High consumption detected.",
            status: "high",
          },
        ],
      },
    });

    fetchAllRecommendations.mockResolvedValue({
      data: {
        allPuroksMonthly: [
          {
            purok: "Purok 1",
            recommendations: [],
          },
        ],
      },
    });

    // Act
    render(
      <AnomalyRecommendationSection type="purokMonthly" purok="Purok 1" />,
    );

    // Assert
    expect(
      await screen.findByText("Purok 1 Monthly Consumption"),
    ).toBeInTheDocument();
  })
});
