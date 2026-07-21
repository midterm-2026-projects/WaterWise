import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const modelMocks = vi.hoisted(() => ({
  getPurokPredictionData: vi.fn(),
  getMonthlyBillingData: vi.fn(),
  getYearlyBillingData: vi.fn(),
  getPurokConsumptionRanking: vi.fn(),
}));

const geminiMocks = vi.hoisted(() => ({
  generateContent: vi.fn(),
  isGeminiConfigured: vi.fn(),
}));

vi.mock(
  "../../models/consumption.model.js",
  () => ({
    getPurokPredictionData:
      modelMocks.getPurokPredictionData,

    getMonthlyBillingData:
      modelMocks.getMonthlyBillingData,

    getYearlyBillingData:
      modelMocks.getYearlyBillingData,

    getPurokConsumptionRanking:
      modelMocks.getPurokConsumptionRanking,
  })
);

vi.mock(
  "../../config/gemini.js",
  () => ({
    ai: {
      models: {
        generateContent:
          geminiMocks.generateContent,
      },
    },

    GEMINI_MODEL: "gemini-test",

    GEMINI_MODELS: [
      "gemini-test",
      "gemini-backup-test",
    ],

    isGeminiConfigured:
      geminiMocks.isGeminiConfigured,
  })
);

import {
  ai,
  isGeminiConfigured,
} from "../../config/gemini.js";

import {
  getPurokPredictionData,
  getMonthlyBillingData,
  getYearlyBillingData,
  getPurokConsumptionRanking,
} from "../../models/consumption.model.js";

import {
  generatePurokMonthlyPrediction,
  generatePurokYearlyPrediction,
  generateMonthlyPrediction,
  generateYearlyPrediction,

  getConsumptionRanking,

  getOverallMonthlyHistory,
  getOverallYearlyHistory,
  getPerPurokMonthlyHistory,
  getPerPurokYearlyHistory,
  getAllPuroksMonthlyHistory,
  getAllPuroksYearlyHistory,
  getAllHistoryConsumption,

  generateOverallMonthlyPrediction,
  generateOverallYearlyPrediction,
  generatePerPurokMonthlyPrediction,
  generatePerPurokYearlyPrediction,
  generateAllPuroksMonthlyPrediction,
  generateAllPuroksYearlyPrediction,
  generateAllPredictionsService,
} from "../../services/consumption.service.js";

describe(
  "Consumption Service",
  () => {
    beforeEach(() => {
      vi.clearAllMocks();

      isGeminiConfigured.mockReturnValue(
        true
      );

      ai.models.generateContent
        .mockResolvedValue({
          text: JSON.stringify({
            predictedConsumption: 1000,
          }),
        });
    });

    // =====================================================
    // PUROK MONTHLY MATHEMATICAL PREDICTION
    // =====================================================

    describe(
      "generatePurokMonthlyPrediction",
      () => {
        it(
          "should generate monthly predictions for every purok in the latest year",
          async () => {
            getPurokPredictionData
              .mockResolvedValue([
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

            const result =
              await generatePurokMonthlyPrediction();

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

            expect(
              getPurokPredictionData
            ).toHaveBeenCalledOnce();
          }
        );

        it(
          "should return the same value when only one month exists",
          async () => {
            getPurokPredictionData
              .mockResolvedValue([
                {
                  year: 2025,
                  purok: "Purok 1",
                  january: 80,
                },
              ]);

            const result =
              await generatePurokMonthlyPrediction();

            expect(
              result[0].predicted
            ).toBe(80);
          }
        );

        it(
          "should return zero when there are no consumption fields",
          async () => {
            getPurokPredictionData
              .mockResolvedValue([
                {
                  year: 2025,
                  purok: "Purok 1",
                },
              ]);

            const result =
              await generatePurokMonthlyPrediction();

            expect(
              result[0].predicted
            ).toBe(0);
          }
        );

        it(
          "should return an empty array when no records exist",
          async () => {
            getPurokPredictionData
              .mockResolvedValue([]);

            const result =
              await generatePurokMonthlyPrediction();

            expect(result).toEqual([]);
          }
        );
      }
    );

    // =====================================================
    // PUROK YEARLY MATHEMATICAL PREDICTION
    // =====================================================

    describe(
      "generatePurokYearlyPrediction",
      () => {
        it(
          "should generate yearly predictions for every purok",
          async () => {
            getPurokPredictionData
              .mockResolvedValue([
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

            const result =
              await generatePurokYearlyPrediction();

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
          "should return the same value when only one historical year exists",
          async () => {
            getPurokPredictionData
              .mockResolvedValue([
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

            const result =
              await generatePurokYearlyPrediction();

            expect(
              result[0].predicted
            ).toBe(250);
          }
        );

        it(
          "should return zero when a yearly record has no consumption fields",
          async () => {
            getPurokPredictionData
              .mockResolvedValue([
                {
                  year: 2025,
                  purok: "Purok 1",
                },
              ]);

            const result =
              await generatePurokYearlyPrediction();

            expect(
              result[0].predicted
            ).toBe(0);
          }
        );

        it(
          "should return an empty array when no yearly records exist",
          async () => {
            getPurokPredictionData
              .mockResolvedValue([]);

            const result =
              await generatePurokYearlyPrediction();

            expect(result).toEqual([]);
          }
        );
      }
    );

    // =====================================================
    // OVERALL MONTHLY MATHEMATICAL PREDICTION
    // =====================================================

    describe(
      "generateMonthlyPrediction",
      () => {
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

        it(
          "should generate a monthly prediction from five months of billing records",
          async () => {
            getMonthlyBillingData
              .mockResolvedValue(
                billingData
              );

            const result =
              await generateMonthlyPrediction();

            expect(
              getMonthlyBillingData
            ).toHaveBeenCalledOnce();

            expect(
              result.at(-1)
            ).toEqual({
              month: "2025-06",
              consumption: 35,
              predicted: true,
            });
          }
        );

        it(
          "should return an empty array when there is no billing data",
          async () => {
            getMonthlyBillingData
              .mockResolvedValue([]);

            const result =
              await generateMonthlyPrediction();

            expect(
              getMonthlyBillingData
            ).toHaveBeenCalledOnce();

            expect(result).toEqual([]);
          }
        );

        it(
          "should return only one predicted month",
          async () => {
            getMonthlyBillingData
              .mockResolvedValue(
                billingData
              );

            const result =
              await generateMonthlyPrediction();

            expect(
              result.filter(
                (item) =>
                  item.predicted
              )
            ).toHaveLength(1);
          }
        );

        it(
          "should append the predicted month as the final record",
          async () => {
            getMonthlyBillingData
              .mockResolvedValue(
                billingData
              );

            const result =
              await generateMonthlyPrediction();

            expect(
              result.at(-1)
            ).toEqual({
              month: "2025-06",
              consumption: 35,
              predicted: true,
            });
          }
        );
      }
    );

    // =====================================================
    // OVERALL YEARLY MATHEMATICAL PREDICTION
    // =====================================================

    describe(
      "generateYearlyPrediction",
      () => {
        it(
          "should generate a yearly prediction from five years of billing records",
          async () => {
            const billingData = [
              {
                billing_date:
                  "2021-01-15",
                cubic_used: 200,
              },
              {
                billing_date:
                  "2021-02-15",
                cubic_used: 180,
              },
              {
                billing_date:
                  "2022-01-15",
                cubic_used: 220,
              },
              {
                billing_date:
                  "2022-02-15",
                cubic_used: 210,
              },
              {
                billing_date:
                  "2023-01-15",
                cubic_used: 250,
              },
              {
                billing_date:
                  "2023-02-15",
                cubic_used: 230,
              },
              {
                billing_date:
                  "2024-01-15",
                cubic_used: 270,
              },
              {
                billing_date:
                  "2024-02-15",
                cubic_used: 260,
              },
              {
                billing_date:
                  "2025-01-15",
                cubic_used: 300,
              },
              {
                billing_date:
                  "2025-02-15",
                cubic_used: 290,
              },
            ];

            getYearlyBillingData
              .mockResolvedValue(
                billingData
              );

            const result =
              await generateYearlyPrediction();

            expect(
              getYearlyBillingData
            ).toHaveBeenCalledOnce();

            expect(
              result.at(-1)
            ).toEqual({
              year: 2026,
              consumption: 482,
              predicted: true,
            });
          }
        );

        it(
          "should return an empty array when there is no yearly billing data",
          async () => {
            getYearlyBillingData
              .mockResolvedValue([]);

            const result =
              await generateYearlyPrediction();

            expect(
              getYearlyBillingData
            ).toHaveBeenCalledOnce();

            expect(result).toEqual([]);
          }
        );

        it(
          "should return only one predicted year",
          async () => {
            getYearlyBillingData
              .mockResolvedValue([
                {
                  billing_date:
                    "2021-01-15",
                  cubic_used: 200,
                },
                {
                  billing_date:
                    "2022-01-15",
                  cubic_used: 220,
                },
                {
                  billing_date:
                    "2023-01-15",
                  cubic_used: 250,
                },
                {
                  billing_date:
                    "2024-01-15",
                  cubic_used: 270,
                },
                {
                  billing_date:
                    "2025-01-15",
                  cubic_used: 300,
                },
              ]);

            const result =
              await generateYearlyPrediction();

            expect(
              result.filter(
                (item) =>
                  item.predicted
              )
            ).toHaveLength(1);
          }
        );

        it(
          "should append the predicted year as the final record",
          async () => {
            getYearlyBillingData
              .mockResolvedValue([
                {
                  billing_date:
                    "2021-01-15",
                  cubic_used: 200,
                },
                {
                  billing_date:
                    "2022-01-15",
                  cubic_used: 220,
                },
                {
                  billing_date:
                    "2023-01-15",
                  cubic_used: 250,
                },
                {
                  billing_date:
                    "2024-01-15",
                  cubic_used: 270,
                },
                {
                  billing_date:
                    "2025-01-15",
                  cubic_used: 300,
                },
              ]);

            const result =
              await generateYearlyPrediction();

            expect(
              result.at(-1)
            ).toEqual({
              year: 2026,
              consumption: 248,
              predicted: true,
            });
          }
        );
      }
    );

    // =====================================================
    // RANKING
    // =====================================================

    describe(
      "getConsumptionRanking",
      () => {
        it(
          "should rank puroks from highest to lowest consumption",
          async () => {
            getPurokConsumptionRanking
              .mockResolvedValue([
                {
                  purok: "Purok 1",
                  consumption: 100,
                },
                {
                  purok: "Purok 2",
                  consumption: 300,
                },
                {
                  purok: "Purok 3",
                  consumption: 200,
                },
              ]);

            const result =
              await getConsumptionRanking();

            expect(
              getPurokConsumptionRanking
            ).toHaveBeenCalledOnce();

            expect(result).toEqual([
              {
                rank: 1,
                purok: "Purok 2",
                consumption: 300,
              },
              {
                rank: 2,
                purok: "Purok 3",
                consumption: 200,
              },
              {
                rank: 3,
                purok: "Purok 1",
                consumption: 100,
              },
            ]);
          }
        );

        it(
          "should return rank one when only one purok exists",
          async () => {
            getPurokConsumptionRanking
              .mockResolvedValue([
                {
                  purok: "Purok 1",
                  consumption: 500,
                },
              ]);

            const result =
              await getConsumptionRanking();

            expect(result).toEqual([
              {
                rank: 1,
                purok: "Purok 1",
                consumption: 500,
              },
            ]);
          }
        );

        it(
          "should return an empty array when no ranking data exists",
          async () => {
            getPurokConsumptionRanking
              .mockResolvedValue([]);

            const result =
              await getConsumptionRanking();

            expect(result).toEqual([]);
          }
        );
      }
    );

    // =====================================================
    // HISTORY AGGREGATION
    // =====================================================

    describe(
      "History aggregation",
      () => {
        describe(
          "getOverallMonthlyHistory",
          () => {
            it(
              "should return overall monthly consumption history for the latest year",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2024,
                      purok:
                        "Purok 1",
                      january: 10,
                      february: 20,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 30,
                      february: 40,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 2",
                      january: 50,
                      february: 60,
                    },
                  ]);

                const result =
                  await getOverallMonthlyHistory();

                expect(result).toEqual([
                  {
                    month:
                      "january",
                    consumption: 80,
                  },
                  {
                    month:
                      "february",
                    consumption: 100,
                  },
                ]);
              }
            );

            it(
              "should return an empty array when there is no monthly history",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue(
                    []
                  );

                const result =
                  await getOverallMonthlyHistory();

                expect(result).toEqual(
                  []
                );
              }
            );
          }
        );

        describe(
          "getOverallYearlyHistory",
          () => {
            it(
              "should return yearly consumption history",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2024,
                      purok:
                        "Purok 1",
                      january: 10,
                      february: 20,
                    },
                    {
                      year: 2024,
                      purok:
                        "Purok 2",
                      january: 30,
                      february: 40,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 50,
                      february: 60,
                    },
                  ]);

                const result =
                  await getOverallYearlyHistory();

                expect(result).toEqual([
                  {
                    year: 2024,
                    consumption: 100,
                  },
                  {
                    year: 2025,
                    consumption: 110,
                  },
                ]);
              }
            );

            it(
              "should return an empty array when there is no yearly history",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue(
                    []
                  );

                const result =
                  await getOverallYearlyHistory();

                expect(result).toEqual(
                  []
                );
              }
            );
          }
        );

        describe(
          "getPerPurokMonthlyHistory",
          () => {
            it(
              "should return monthly history for the selected purok",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 15,
                      february: 25,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 2",
                      january: 35,
                      february: 45,
                    },
                  ]);

                const result =
                  await getPerPurokMonthlyHistory(
                    "Purok 1"
                  );

                expect(result).toEqual([
                  {
                    month:
                      "january",
                    consumption: 15,
                  },
                  {
                    month:
                      "february",
                    consumption: 25,
                  },
                ]);
              }
            );

            it(
              "should use the latest year available for the selected purok",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2024,
                      purok:
                        "Purok 1",
                      january: 10,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 20,
                    },
                    {
                      year: 2026,
                      purok:
                        "Purok 2",
                      january: 30,
                    },
                  ]);

                const result =
                  await getPerPurokMonthlyHistory(
                    "Purok 1"
                  );

                expect(result).toEqual([
                  {
                    month:
                      "january",
                    consumption: 20,
                  },
                ]);
              }
            );

            it(
              "should return an empty array when the purok does not exist",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue(
                    []
                  );

                const result =
                  await getPerPurokMonthlyHistory(
                    "Purok 99"
                  );

                expect(result).toEqual(
                  []
                );
              }
            );
          }
        );

        describe(
          "getPerPurokYearlyHistory",
          () => {
            it(
              "should return yearly history for the selected purok",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2024,
                      purok:
                        "Purok 1",
                      january: 20,
                      february: 30,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 40,
                      february: 50,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 2",
                      january: 100,
                    },
                  ]);

                const result =
                  await getPerPurokYearlyHistory(
                    "Purok 1"
                  );

                expect(result).toEqual([
                  {
                    year: 2024,
                    consumption: 50,
                  },
                  {
                    year: 2025,
                    consumption: 90,
                  },
                ]);
              }
            );

            it(
              "should return an empty array when the purok does not exist",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue(
                    []
                  );

                const result =
                  await getPerPurokYearlyHistory(
                    "Purok 99"
                  );

                expect(result).toEqual(
                  []
                );
              }
            );
          }
        );

        describe(
          "getAllPuroksMonthlyHistory",
          () => {
            it(
              "should return monthly history for all puroks in the latest year",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2024,
                      purok:
                        "Purok 1",
                      january: 10,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 20,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 2",
                      january: 30,
                    },
                  ]);

                const result =
                  await getAllPuroksMonthlyHistory();

                expect(result).toEqual([
                  {
                    purok:
                      "Purok 1",
                    latestYear: 2025,
                    historical: [
                      {
                        month:
                          "january",
                        consumption: 20,
                      },
                    ],
                  },
                  {
                    purok:
                      "Purok 2",
                    latestYear: 2025,
                    historical: [
                      {
                        month:
                          "january",
                        consumption: 30,
                      },
                    ],
                  },
                ]);
              }
            );

            it(
              "should return an empty array when no monthly records exist",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue(
                    []
                  );

                const result =
                  await getAllPuroksMonthlyHistory();

                expect(result).toEqual(
                  []
                );
              }
            );
          }
        );

        describe(
          "getAllPuroksYearlyHistory",
          () => {
            it(
              "should return yearly history for every purok",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2024,
                      purok:
                        "Purok 1",
                      january: 10,
                      february: 20,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 30,
                      february: 40,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 2",
                      january: 50,
                      february: 60,
                    },
                  ]);

                const result =
                  await getAllPuroksYearlyHistory();

                expect(result).toEqual([
                  {
                    purok:
                      "Purok 1",
                    historical: [
                      {
                        year: 2024,
                        consumption: 30,
                      },
                      {
                        year: 2025,
                        consumption: 70,
                      },
                    ],
                  },
                  {
                    purok:
                      "Purok 2",
                    historical: [
                      {
                        year: 2025,
                        consumption: 110,
                      },
                    ],
                  },
                ]);
              }
            );

            it(
              "should return an empty array when no yearly records exist",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue(
                    []
                  );

                const result =
                  await getAllPuroksYearlyHistory();

                expect(result).toEqual(
                  []
                );
              }
            );
          }
        );

        describe(
          "getAllHistoryConsumption",
          () => {
            it(
              "should return all history categories",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 10,
                      february: 20,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 2",
                      january: 30,
                      february: 40,
                    },
                  ]);

                const result =
                  await getAllHistoryConsumption();

                expect(result)
                  .toHaveProperty(
                    "overallMonthly"
                  );

                expect(result)
                  .toHaveProperty(
                    "overallYearly"
                  );

                expect(result)
                  .toHaveProperty(
                    "allPuroksMonthly"
                  );

                expect(result)
                  .toHaveProperty(
                    "allPuroksYearly"
                  );

                expect(
                  result.overallMonthly
                ).toEqual([
                  {
                    month:
                      "january",
                    consumption: 40,
                  },
                  {
                    month:
                      "february",
                    consumption: 60,
                  },
                ]);
              }
            );
          }
        );
      }
    );

    // =====================================================
    // GEMINI AI PREDICTIONS
    // =====================================================

    describe(
      "Gemini consumption prediction",
      () => {
        describe(
          "generateOverallMonthlyPrediction",
          () => {
            it(
              "should generate an overall monthly prediction",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 100,
                      february: 120,
                      march: 140,
                      april: 160,
                      may: 180,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 2",
                      january: 200,
                      february: 220,
                      march: 240,
                      april: 260,
                      may: 280,
                    },
                  ]);

                ai.models.generateContent
                  .mockResolvedValue({
                    text: JSON.stringify({
                      predictedConsumption:
                        500,
                    }),
                  });

                const result =
                  await generateOverallMonthlyPrediction();

                expect(result).toEqual({
                  predictedConsumption:
                    500,
                });

                expect(
                  ai.models.generateContent
                ).toHaveBeenCalledTimes(
                  1
                );
              }
            );

            it(
              "should return zero when no monthly history exists",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue(
                    []
                  );

                const result =
                  await generateOverallMonthlyPrediction();

                expect(result).toEqual({
                  predictedConsumption:
                    0,
                });

                expect(
                  ai.models.generateContent
                ).not
                  .toHaveBeenCalled();
              }
            );

            it(
              "should throw when Gemini returns invalid JSON",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 100,
                    },
                  ]);

                ai.models.generateContent
                  .mockResolvedValue({
                    text: "invalid json",
                  });

                await expect(
                  generateOverallMonthlyPrediction()
                ).rejects.toThrow(
                  /invalid JSON/i
                );

                expect(
                  ai.models.generateContent
                ).toHaveBeenCalledTimes(
                  2
                );
              }
            );
          }
        );

        describe(
          "generateOverallYearlyPrediction",
          () => {
            it(
              "should generate an overall yearly prediction",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2024,
                      purok:
                        "Purok 1",
                      january: 100,
                      february: 100,
                      march: 100,
                      april: 100,
                      may: 100,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 200,
                      february: 200,
                      march: 200,
                      april: 200,
                      may: 200,
                    },
                  ]);

                ai.models.generateContent
                  .mockResolvedValue({
                    text: JSON.stringify({
                      predictedConsumption:
                        1500,
                    }),
                  });

                const result =
                  await generateOverallYearlyPrediction();

                expect(result).toEqual({
                  predictedConsumption:
                    1500,
                });
              }
            );

            it(
              "should return zero when no yearly history exists",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue(
                    []
                  );

                const result =
                  await generateOverallYearlyPrediction();

                expect(result).toEqual({
                  predictedConsumption:
                    0,
                });

                expect(
                  ai.models.generateContent
                ).not
                  .toHaveBeenCalled();
              }
            );

            it(
              "should throw when Gemini returns invalid yearly JSON",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 100,
                    },
                  ]);

                ai.models.generateContent
                  .mockResolvedValue({
                    text: "invalid json",
                  });

                await expect(
                  generateOverallYearlyPrediction()
                ).rejects.toThrow(
                  /invalid JSON/i
                );

                expect(
                  ai.models.generateContent
                ).toHaveBeenCalledTimes(
                  2
                );
              }
            );
          }
        );

        describe(
          "generatePerPurokMonthlyPrediction",
          () => {
            it(
              "should generate a monthly prediction for a selected purok",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 50,
                      february: 60,
                      march: 70,
                      april: 80,
                      may: 90,
                    },
                  ]);

                ai.models.generateContent
                  .mockResolvedValue({
                    text: JSON.stringify({
                      purok:
                        "Purok 1",
                      predictedConsumption:
                        100,
                    }),
                  });

                const result =
                  await generatePerPurokMonthlyPrediction(
                    "Purok 1"
                  );

                expect(result).toEqual({
                  purok: "Purok 1",
                  predictedConsumption:
                    100,
                });
              }
            );

            it(
              "should return zero when the purok has no monthly history",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue(
                    []
                  );

                const result =
                  await generatePerPurokMonthlyPrediction(
                    "Purok 99"
                  );

                expect(result).toEqual({
                  purok:
                    "Purok 99",
                  predictedConsumption:
                    0,
                });

                expect(
                  ai.models.generateContent
                ).not
                  .toHaveBeenCalled();
              }
            );

            it(
              "should throw when Gemini returns invalid monthly purok JSON",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 50,
                    },
                  ]);

                ai.models.generateContent
                  .mockResolvedValue({
                    text: "invalid json",
                  });

                await expect(
                  generatePerPurokMonthlyPrediction(
                    "Purok 1"
                  )
                ).rejects.toThrow(
                  /invalid JSON/i
                );
              }
            );
          }
        );

        describe(
          "generatePerPurokYearlyPrediction",
          () => {
            it(
              "should generate a yearly prediction for a selected purok",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2024,
                      purok:
                        "Purok 1",
                      january: 100,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 150,
                    },
                  ]);

                ai.models.generateContent
                  .mockResolvedValue({
                    text: JSON.stringify({
                      purok:
                        "Purok 1",
                      predictedConsumption:
                        200,
                    }),
                  });

                const result =
                  await generatePerPurokYearlyPrediction(
                    "Purok 1"
                  );

                expect(result).toEqual({
                  purok: "Purok 1",
                  predictedConsumption:
                    200,
                });
              }
            );

            it(
              "should return zero when the purok has no yearly history",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue(
                    []
                  );

                const result =
                  await generatePerPurokYearlyPrediction(
                    "Purok 99"
                  );

                expect(result).toEqual({
                  purok:
                    "Purok 99",
                  predictedConsumption:
                    0,
                });
              }
            );
          }
        );

        describe(
          "generateAllPuroksMonthlyPrediction",
          () => {
            it(
              "should generate monthly predictions for all puroks",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 100,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 2",
                      january: 200,
                    },
                  ]);

                ai.models.generateContent
                  .mockResolvedValue({
                    text: JSON.stringify([
                      {
                        purok:
                          "Purok 1",
                        predictedConsumption:
                          120,
                      },
                      {
                        purok:
                          "Purok 2",
                        predictedConsumption:
                          220,
                      },
                    ]),
                  });

                const result =
                  await generateAllPuroksMonthlyPrediction();

                expect(result).toEqual([
                  {
                    purok:
                      "Purok 1",
                    predictedConsumption:
                      120,
                  },
                  {
                    purok:
                      "Purok 2",
                    predictedConsumption:
                      220,
                  },
                ]);
              }
            );

            it(
              "should return an empty array when no purok monthly history exists",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue(
                    []
                  );

                const result =
                  await generateAllPuroksMonthlyPrediction();

                expect(result).toEqual(
                  []
                );
              }
            );
          }
        );

        describe(
          "generateAllPuroksYearlyPrediction",
          () => {
            it(
              "should generate yearly predictions for all puroks",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 100,
                    },
                    {
                      year: 2025,
                      purok:
                        "Purok 2",
                      january: 200,
                    },
                  ]);

                ai.models.generateContent
                  .mockResolvedValue({
                    text: JSON.stringify([
                      {
                        purok:
                          "Purok 1",
                        predictedConsumption:
                          1200,
                      },
                      {
                        purok:
                          "Purok 2",
                        predictedConsumption:
                          2200,
                      },
                    ]),
                  });

                const result =
                  await generateAllPuroksYearlyPrediction();

                expect(result).toEqual([
                  {
                    purok:
                      "Purok 1",
                    predictedConsumption:
                      1200,
                  },
                  {
                    purok:
                      "Purok 2",
                    predictedConsumption:
                      2200,
                  },
                ]);
              }
            );

            it(
              "should return an empty array when no purok yearly history exists",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue(
                    []
                  );

                const result =
                  await generateAllPuroksYearlyPrediction();

                expect(result).toEqual(
                  []
                );
              }
            );
          }
        );

        describe(
          "generateAllPredictionsService",
          () => {
            it(
              "should generate all AI prediction categories",
              async () => {
                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 100,
                    },
                  ]);

                ai.models.generateContent
                  .mockImplementation(
                    async ({
                      contents,
                    }) => {
                      if (
                        contents.includes(
                          "every purok"
                        )
                      ) {
                        return {
                          text:
                            JSON.stringify([
                              {
                                purok:
                                  "Purok 1",
                                predictedConsumption:
                                  150,
                              },
                            ]),
                        };
                      }

                      return {
                        text:
                          JSON.stringify({
                            predictedConsumption:
                              150,
                          }),
                      };
                    }
                  );

                const result =
                  await generateAllPredictionsService();

                expect(result)
                  .toHaveProperty(
                    "overallMonthly"
                  );

                expect(result)
                  .toHaveProperty(
                    "overallYearly"
                  );

                expect(result)
                  .toHaveProperty(
                    "allPuroksMonthly"
                  );

                expect(result)
                  .toHaveProperty(
                    "allPuroksYearly"
                  );

                expect(
                  ai.models.generateContent
                ).toHaveBeenCalledTimes(
                  4
                );
              }
            );
          }
        );

        describe(
          "Gemini configuration",
          () => {
            it(
              "should throw when Gemini is not configured",
              async () => {
                isGeminiConfigured
                  .mockReturnValue(
                    false
                  );

                getPurokPredictionData
                  .mockResolvedValue([
                    {
                      year: 2025,
                      purok:
                        "Purok 1",
                      january: 100,
                    },
                  ]);

                await expect(
                  generateOverallMonthlyPrediction()
                ).rejects.toThrow(
                  "Gemini API is not configured."
                );

                expect(
                  ai.models.generateContent
                ).not
                  .toHaveBeenCalled();
              }
            );
          }
        );
      }
    );
  }
);