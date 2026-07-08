import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

vi.mock(
  "../models/consumption.model.js",
  () => ({
    getPurokPredictionData: vi.fn(),
    getMonthlyBillingData: vi.fn(),
    getYearlyBillingData: vi.fn(),
  })
);

import {
  getPurokPredictionData,
  getMonthlyBillingData,
  getYearlyBillingData,
} from "../models/consumption.model.js";

import {
  generatePurokMonthlyPrediction,
  generatePurokYearlyPrediction,
  generateMonthlyPrediction,
  generateYearlyPrediction,
} from "../services/consumption.service.js";

describe("Consumption Service", () => {

  beforeEach(() => {

    vi.clearAllMocks();

  });

  describe(
    "generatePurokMonthlyPrediction",
    () => {

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
            generatePurokMonthlyPrediction();

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
            generatePurokMonthlyPrediction();

          // Assert

          expect(
            result[0].predicted
          ).toBe(80);

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
            generatePurokMonthlyPrediction();

          // Assert

          expect(
            result[0].predicted
          ).toBe(0);

        }
      );

    }
  );

    describe(
    "generatePurokYearlyPrediction",
    () => {

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
            generatePurokYearlyPrediction();

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
            generatePurokYearlyPrediction();

          // Assert

          expect(
            result[0].predicted
          ).toBe(250);

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
            generatePurokYearlyPrediction();

          // Assert

          expect(
            result[0].predicted
          ).toBe(0);

        }
      );

    }
  );

    describe(
    "generateMonthlyPrediction",
    () => {

      it(
        "It should generate the monthly prediction from five months of billing records.",
        () => {

          // Arrange

          const billingData = [
            {
              billing_date: "2025-01-15",
              cubic_used: 18,
            },
            {
              billing_date: "2025-01-18",
              cubic_used: 22,
            },

            {
              billing_date: "2025-02-10",
              cubic_used: 25,
            },
            {
              billing_date: "2025-02-18",
              cubic_used: 20,
            },

            {
              billing_date: "2025-03-12",
              cubic_used: 30,
            },

            {
              billing_date: "2025-04-08",
              cubic_used: 28,
            },

            {
              billing_date: "2025-05-10",
              cubic_used: 32,
            },
          ];

          getMonthlyBillingData.mockReturnValue(
            billingData
          );

          // Act

          const result =
            generateMonthlyPrediction();

          // Assert

          expect(
            getMonthlyBillingData
          ).toHaveBeenCalledOnce();

          expect(result.at(-1)).toEqual({
            month: "2025-06",
            consumption: 35,
            predicted: true,
          });

        }
      );

      it(
        "It should return an empty array when there is no billing data.",
        () => {

          // Arrange

          getMonthlyBillingData.mockReturnValue(
            []
          );

          // Act

          const result =
            generateMonthlyPrediction();

          // Assert

          expect(
            getMonthlyBillingData
          ).toHaveBeenCalledOnce();

          expect(result).toEqual([]);

        }
      );

      it(
        "It should return only one predicted month.",
        () => {

          // Arrange

          getMonthlyBillingData.mockReturnValue([
            {
              billing_date: "2025-01-15",
              cubic_used: 18,
            },
            {
              billing_date: "2025-01-18",
              cubic_used: 22,
            },
            {
              billing_date: "2025-02-10",
              cubic_used: 25,
            },
            {
              billing_date: "2025-02-18",
              cubic_used: 20,
            },
            {
              billing_date: "2025-03-12",
              cubic_used: 30,
            },
            {
              billing_date: "2025-04-08",
              cubic_used: 28,
            },
            {
              billing_date: "2025-05-10",
              cubic_used: 32,
            },
          ]);

          // Act

          const result =
            generateMonthlyPrediction();

          // Assert

          expect(
            getMonthlyBillingData
          ).toHaveBeenCalledOnce();

          expect(
            result.filter(
              (item) => item.predicted
            )
          ).toHaveLength(1);

        }
      );

      it(
        "It should append the predicted month as the last record.",
        () => {

          // Arrange

          getMonthlyBillingData.mockReturnValue([
            {
              billing_date: "2025-01-15",
              cubic_used: 18,
            },
            {
              billing_date: "2025-01-18",
              cubic_used: 22,
            },
            {
              billing_date: "2025-02-10",
              cubic_used: 25,
            },
            {
              billing_date: "2025-02-18",
              cubic_used: 20,
            },
            {
              billing_date: "2025-03-12",
              cubic_used: 30,
            },
            {
              billing_date: "2025-04-08",
              cubic_used: 28,
            },
            {
              billing_date: "2025-05-10",
              cubic_used: 32,
            },
          ]);

          // Act

          const result =
            generateMonthlyPrediction();

          // Assert

          expect(
            getMonthlyBillingData
          ).toHaveBeenCalledOnce();

          expect(result.at(-1)).toEqual({
            month: "2025-06",
            consumption: 35,
            predicted: true,
          });

        }
      );

    }
  );

    describe(
    "generateYearlyPrediction",
    () => {

      it(
        "It should generate the yearly prediction from five years of billing records.",
        () => {

          // Arrange

          const billingData = [
            {
              billing_date: "2021-01-15",
              cubic_used: 200,
            },
            {
              billing_date: "2021-02-15",
              cubic_used: 180,
            },

            {
              billing_date: "2022-01-15",
              cubic_used: 220,
            },
            {
              billing_date: "2022-02-15",
              cubic_used: 210,
            },

            {
              billing_date: "2023-01-15",
              cubic_used: 250,
            },
            {
              billing_date: "2023-02-15",
              cubic_used: 230,
            },

            {
              billing_date: "2024-01-15",
              cubic_used: 270,
            },
            {
              billing_date: "2024-02-15",
              cubic_used: 260,
            },

            {
              billing_date: "2025-01-15",
              cubic_used: 300,
            },
            {
              billing_date: "2025-02-15",
              cubic_used: 290,
            },
          ];

          getYearlyBillingData.mockReturnValue(
            billingData
          );

          // Act

          const result =
            generateYearlyPrediction();

          // Assert

          expect(
            getYearlyBillingData
          ).toHaveBeenCalledOnce();

          expect(result.at(-1)).toEqual({
            year: 2026,
            consumption: 482,
            predicted: true,
          });

        }
      );

      it(
        "It should return an empty array when there is no billing data.",
        () => {

          // Arrange

          getYearlyBillingData.mockReturnValue(
            []
          );

          // Act

          const result =
            generateYearlyPrediction();

          // Assert

          expect(
            getYearlyBillingData
          ).toHaveBeenCalledOnce();

          expect(result).toEqual([]);

        }
      );

      it(
        "It should return only one predicted year.",
        () => {

          // Arrange

          getYearlyBillingData.mockReturnValue([
            {
              billing_date: "2021-01-15",
              cubic_used: 200,
            },
            {
              billing_date: "2022-01-15",
              cubic_used: 220,
            },
            {
              billing_date: "2023-01-15",
              cubic_used: 250,
            },
            {
              billing_date: "2024-01-15",
              cubic_used: 270,
            },
            {
              billing_date: "2025-01-15",
              cubic_used: 300,
            },
          ]);

          // Act

          const result =
            generateYearlyPrediction();

          // Assert

          expect(
            getYearlyBillingData
          ).toHaveBeenCalledOnce();

          expect(
            result.filter(
              (item) => item.predicted
            )
          ).toHaveLength(1);

        }
      );

      it(
        "It should append the predicted year as the last record.",
        () => {

          // Arrange

          getYearlyBillingData.mockReturnValue([
            {
              billing_date: "2021-01-15",
              cubic_used: 200,
            },
            {
              billing_date: "2022-01-15",
              cubic_used: 220,
            },
            {
              billing_date: "2023-01-15",
              cubic_used: 250,
            },
            {
              billing_date: "2024-01-15",
              cubic_used: 270,
            },
            {
              billing_date: "2025-01-15",
              cubic_used: 300,
            },
          ]);

          // Act

          const result =
            generateYearlyPrediction();

          // Assert

          expect(
            getYearlyBillingData
          ).toHaveBeenCalledOnce();

          expect(result.at(-1)).toEqual({
            year: 2026,
            consumption: 248,
            predicted: true,
          });

        }
      );

    }
  );

});