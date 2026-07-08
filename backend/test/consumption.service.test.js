import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  generateMonthlyPrediction,
  generateYearlyPrediction,
} from "../services/consumption.service.js";

import { getPurokPredictionData } from "../models/consumption.model.js";

vi.mock(
  "../models/consumption.model.js",
  () => ({
    getPurokPredictionData: vi.fn(),
  })
);

describe("Consumption Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("generateMonthlyPrediction", () => {
    it(
      "It should generate monthly prediction for every purok in the latest year.",
      () => {
        // Arrange
        getPurokPredictionData.mockReturnValue([
          {
            year: 2024,
            purok: "Purok 1",
            january: 40,
            february: 42,
            march: 44,
            april: 46,
            may: 48,
          },
          {
            year: 2025,
            purok: "Purok 1",
            january: 50,
            february: 52,
            march: 54,
            april: 56,
            may: 58,
          },
          {
            year: 2025,
            purok: "Purok 2",
            january: 60,
            february: 62,
            march: 64,
            april: 66,
            may: 68,
          },
        ]);

        // Act
        const result =
          generateMonthlyPrediction();

        // Assert
        expect(result).toEqual([
          {
            purok: "Purok 1",
            latestYear: 2025,
            historical: [
              {
                period: "january",
                consumption: 50,
              },
              {
                period: "february",
                consumption: 52,
              },
              {
                period: "march",
                consumption: 54,
              },
              {
                period: "april",
                consumption: 56,
              },
              {
                period: "may",
                consumption: 58,
              },
            ],
            predicted: 60,
          },
          {
            purok: "Purok 2",
            latestYear: 2025,
            historical: [
              {
                period: "january",
                consumption: 60,
              },
              {
                period: "february",
                consumption: 62,
              },
              {
                period: "march",
                consumption: 64,
              },
              {
                period: "april",
                consumption: 66,
              },
              {
                period: "may",
                consumption: 68,
              },
            ],
            predicted: 70,
          },
        ]);
      }
    );

    it(
      "It should return the same value when only one month exists.",
      () => {
        // Arrange
        getPurokPredictionData.mockReturnValue([
          {
            year: 2025,
            purok: "Purok 1",
            january: 80,
          },
        ]);

        // Act
        const result =
          generateMonthlyPrediction();

        // Assert
        expect(result[0].predicted).toBe(80);
      }
    );

    it(
      "It should return zero when there are no consumption fields.",
      () => {
        // Arrange
        getPurokPredictionData.mockReturnValue([
          {
            year: 2025,
            purok: "Purok 1",
          },
        ]);

        // Act
        const result =
          generateMonthlyPrediction();

        // Assert
        expect(result[0].predicted).toBe(0);
      }
    );
  });

  describe("generateYearlyPrediction", () => {
    it(
      "It should generate yearly prediction for every purok.",
      () => {
        // Arrange
        getPurokPredictionData.mockReturnValue([
          {
            year: 2024,
            purok: "Purok 1",
            january: 40,
            february: 40,
            march: 40,
            april: 40,
            may: 40,
          },
          {
            year: 2025,
            purok: "Purok 1",
            january: 50,
            february: 50,
            march: 50,
            april: 50,
            may: 50,
          },
          {
            year: 2024,
            purok: "Purok 2",
            january: 60,
            february: 60,
            march: 60,
            april: 60,
            may: 60,
          },
          {
            year: 2025,
            purok: "Purok 2",
            january: 70,
            february: 70,
            march: 70,
            april: 70,
            may: 70,
          },
        ]);

        // Act
        const result =
          generateYearlyPrediction();

        // Assert
        expect(result).toEqual([
          {
            purok: "Purok 1",
            historical: [
              {
                year: 2024,
                consumption: 200,
              },
              {
                year: 2025,
                consumption: 250,
              },
            ],
            predicted: 300,
          },
          {
            purok: "Purok 2",
            historical: [
              {
                year: 2024,
                consumption: 300,
              },
              {
                year: 2025,
                consumption: 350,
              },
            ],
            predicted: 400,
          },
        ]);
      }
    );

    it(
      "It should return the same value when only one historical year exists.",
      () => {
        // Arrange
        getPurokPredictionData.mockReturnValue([
          {
            year: 2025,
            purok: "Purok 1",
            january: 50,
            february: 50,
            march: 50,
            april: 50,
            may: 50,
          },
        ]);

        // Act
        const result =
          generateYearlyPrediction();

        // Assert
        expect(result[0].predicted).toBe(250);
      }
    );

    it(
      "It should return zero when a yearly record has no consumption fields.",
      () => {
        // Arrange
        getPurokPredictionData.mockReturnValue([
          {
            year: 2025,
            purok: "Purok 1",
          },
        ]);

        // Act
        const result =
          generateYearlyPrediction();

        // Assert
        expect(result[0].predicted).toBe(0);
      }
    );
  });
});