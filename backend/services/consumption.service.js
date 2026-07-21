// backend/services/consumption.services.js

import {
  ai,
  GEMINI_MODELS,
  isGeminiConfigured,
} from "../config/gemini.js";

import {
  getPurokPredictionData,
  getMonthlyBillingData,
  getYearlyBillingData,
  getPurokConsumptionRanking,
} from "../models/consumption.model.js";

const MONTH_ORDER = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const toNumber = (value) => {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
};

const calculatePrediction = (values) => {
  const numericValues = values.map(toNumber);

  if (numericValues.length === 0) {
    return 0;
  }

  if (numericValues.length === 1) {
    return Math.round(
      numericValues[0]
    );
  }

  const growth =
    (
      numericValues[
        numericValues.length - 1
      ] -
      numericValues[0]
    ) /
    (numericValues.length - 1);

  return Math.max(
    0,
    Math.round(
      numericValues[
        numericValues.length - 1
      ] + growth
    )
  );
};

const getConsumptionFields = (record) => {
  return MONTH_ORDER.filter(
    (month) =>
      Object.prototype.hasOwnProperty.call(
        record,
        month
      )
  );
};

const getRecordYearTotal = (record) => {
  return getConsumptionFields(record)
    .reduce(
      (total, month) =>
        total +
        toNumber(record[month]),
      0
    );
};

// ==========================================
// LOCAL / DETERMINISTIC PREDICTIONS
// ==========================================

// Purok Monthly Prediction
export const generatePurokMonthlyPrediction =
  async () => {
    const records =
      await getPurokPredictionData();

    if (records.length === 0) {
      return [];
    }

    const latestYear = Math.max(
      ...records.map(
        (record) =>
          toNumber(record.year)
      )
    );

    const latestYearRecords =
      records.filter(
        (record) =>
          toNumber(record.year) ===
          latestYear
      );

    return latestYearRecords.map(
      (record) => {
        const historical =
          getConsumptionFields(record)
            .map((month) => ({
              period: month,
              consumption:
                toNumber(
                  record[month]
                ),
            }));

        const predictedConsumption =
          calculatePrediction(
            historical.map(
              (item) =>
                item.consumption
            )
          );

        return {
          purok: record.purok,
          latestYear,
          historical,
          predicted:
            predictedConsumption,
        };
      }
    );
  };

// Purok Yearly Prediction
export const generatePurokYearlyPrediction =
  async () => {
    const records =
      await getPurokPredictionData();

    if (records.length === 0) {
      return [];
    }

    const puroks = [
      ...new Set(
        records
          .map(
            (record) =>
              record.purok
          )
          .filter(Boolean)
      ),
    ];

    return puroks.map(
      (purok) => {
        const historical =
          records
            .filter(
              (record) =>
                record.purok ===
                purok
            )
            .sort(
              (a, b) =>
                toNumber(a.year) -
                toNumber(b.year)
            )
            .map((record) => ({
              year:
                toNumber(
                  record.year
                ),
              consumption:
                getRecordYearTotal(
                  record
                ),
            }));

        const predictedConsumption =
          calculatePrediction(
            historical.map(
              (item) =>
                item.consumption
            )
          );

        return {
          purok,
          historical,
          predicted:
            predictedConsumption,
        };
      }
    );
  };

// Overall Monthly Prediction
export const generateMonthlyPrediction =
  async () => {
    const records =
      await getMonthlyBillingData();

    const monthlyTotals = {};

    records.forEach((record) => {
      if (!record.billing_date) {
        return;
      }

      const month =
        String(
          record.billing_date
        ).slice(0, 7);

      monthlyTotals[month] =
        (
          monthlyTotals[month] ??
          0
        ) +
        toNumber(
          record.cubic_used
        );
    });

    const monthlyData =
      Object.entries(
        monthlyTotals
      )
        .sort(
          ([monthA], [monthB]) =>
            monthA.localeCompare(
              monthB
            )
        )
        .map(
          ([
            month,
            consumption,
          ]) => ({
            month,
            consumption:
              toNumber(consumption),
            predicted: false,
          })
        )
        .slice(-5);

    if (
      monthlyData.length === 0
    ) {
      return [];
    }

    const predictedConsumption =
      Math.round(
        monthlyData.reduce(
          (total, item) =>
            total +
            item.consumption,
          0
        ) /
          monthlyData.length
      );

    const [year, month] =
      monthlyData
        .at(-1)
        .month
        .split("-")
        .map(Number);

    const nextMonth =
      new Date(
        Date.UTC(
          year,
          month,
          1
        )
      );

    monthlyData.push({
      month: `${nextMonth.getUTCFullYear()}-${String(
        nextMonth.getUTCMonth() + 1
      ).padStart(2, "0")}`,
      consumption:
        predictedConsumption,
      predicted: true,
    });

    return monthlyData;
  };

// Overall Yearly Prediction
export const generateYearlyPrediction =
  async () => {
    const records =
      await getYearlyBillingData();

    const yearlyTotals = {};

    records.forEach((record) => {
      if (!record.billing_date) {
        return;
      }

      const year =
        String(
          record.billing_date
        ).slice(0, 4);

      yearlyTotals[year] =
        (
          yearlyTotals[year] ??
          0
        ) +
        toNumber(
          record.cubic_used
        );
    });

    const yearlyData =
      Object.entries(
        yearlyTotals
      )
        .sort(
          ([yearA], [yearB]) =>
            Number(yearA) -
            Number(yearB)
        )
        .map(
          ([
            year,
            consumption,
          ]) => ({
            year: Number(year),
            consumption:
              toNumber(consumption),
            predicted: false,
          })
        )
        .slice(-5);

    if (
      yearlyData.length === 0
    ) {
      return [];
    }

    const predictedConsumption =
      Math.round(
        yearlyData.reduce(
          (total, item) =>
            total +
            item.consumption,
          0
        ) /
          yearlyData.length
      );

    yearlyData.push({
      year:
        yearlyData.at(-1)
          .year + 1,
      consumption:
        predictedConsumption,
      predicted: true,
    });

    return yearlyData;
  };

// ==========================================
// CONSUMPTION RANKING
// ==========================================

export const getConsumptionRanking =
  async () => {
    const data =
      await getPurokConsumptionRanking();

    return [...data]
      .sort(
        (a, b) =>
          toNumber(
            b.consumption
          ) -
          toNumber(
            a.consumption
          )
      )
      .map(
        (item, index) => ({
          rank: index + 1,
          ...item,
          consumption:
            toNumber(
              item.consumption
            ),
        })
      );
  };

// ==========================================
// HISTORY AGGREGATION
// ==========================================

// Overall Monthly History
export const getOverallMonthlyHistory =
  async () => {
    const records =
      await getPurokPredictionData();

    if (records.length === 0) {
      return [];
    }

    const latestYear = Math.max(
      ...records.map(
        (record) =>
          toNumber(record.year)
      )
    );

    const latestRecords =
      records.filter(
        (record) =>
          toNumber(record.year) ===
          latestYear
      );

    const totals = {};

    latestRecords.forEach(
      (record) => {
        getConsumptionFields(record)
          .forEach((month) => {
            totals[month] =
              (
                totals[month] ??
                0
              ) +
              toNumber(
                record[month]
              );
          });
      }
    );

    return MONTH_ORDER
      .filter(
        (month) =>
          Object.prototype
            .hasOwnProperty.call(
              totals,
              month
            )
      )
      .map((month) => ({
        month,
        consumption:
          toNumber(
            totals[month]
          ),
      }));
  };

// Overall Yearly History
export const getOverallYearlyHistory =
  async () => {
    const records =
      await getPurokPredictionData();

    const yearlyTotals = {};

    records.forEach((record) => {
      const year =
        toNumber(record.year);

      if (!year) {
        return;
      }

      yearlyTotals[year] =
        (
          yearlyTotals[year] ??
          0
        ) +
        getRecordYearTotal(
          record
        );
    });

    return Object.entries(
      yearlyTotals
    )
      .sort(
        ([yearA], [yearB]) =>
          Number(yearA) -
          Number(yearB)
      )
      .map(
        ([
          year,
          consumption,
        ]) => ({
          year: Number(year),
          consumption:
            toNumber(consumption),
        })
      );
  };

// Purok Monthly History
export const getPerPurokMonthlyHistory =
  async (purok) => {
    const records =
      await getPurokPredictionData();

    const purokRecords =
      records.filter(
        (record) =>
          record.purok === purok
      );

    if (
      purokRecords.length === 0
    ) {
      return [];
    }

    const latestYear = Math.max(
      ...purokRecords.map(
        (record) =>
          toNumber(record.year)
      )
    );

    const record =
      purokRecords.find(
        (item) =>
          toNumber(item.year) ===
          latestYear
      );

    if (!record) {
      return [];
    }

    return getConsumptionFields(
      record
    ).map((month) => ({
      month,
      consumption:
        toNumber(
          record[month]
        ),
    }));
  };

// Purok Yearly History
export const getPerPurokYearlyHistory =
  async (purok) => {
    const records =
      await getPurokPredictionData();

    return records
      .filter(
        (record) =>
          record.purok === purok
      )
      .sort(
        (a, b) =>
          toNumber(a.year) -
          toNumber(b.year)
      )
      .map((record) => ({
        year:
          toNumber(
            record.year
          ),
        consumption:
          getRecordYearTotal(
            record
          ),
      }));
  };

// All Puroks Monthly History
export const getAllPuroksMonthlyHistory =
  async () => {
    const records =
      await getPurokPredictionData();

    if (records.length === 0) {
      return [];
    }

    const latestYear = Math.max(
      ...records.map(
        (record) =>
          toNumber(record.year)
      )
    );

    return records
      .filter(
        (record) =>
          toNumber(record.year) ===
          latestYear
      )
      .map((record) => ({
        purok: record.purok,
        latestYear,
        historical:
          getConsumptionFields(record)
            .map((month) => ({
              month,
              consumption:
                toNumber(
                  record[month]
                ),
            })),
      }));
  };

// All Puroks Yearly History
export const getAllPuroksYearlyHistory =
  async () => {
    const records =
      await getPurokPredictionData();

    const puroks = [
      ...new Set(
        records
          .map(
            (record) =>
              record.purok
          )
          .filter(Boolean)
      ),
    ];

    return puroks.map(
      (purok) => ({
        purok,
        historical: records
          .filter(
            (record) =>
              record.purok ===
              purok
          )
          .sort(
            (a, b) =>
              toNumber(a.year) -
              toNumber(b.year)
          )
          .map((record) => ({
            year:
              toNumber(
                record.year
              ),
            consumption:
              getRecordYearTotal(
                record
              ),
          })),
      })
    );
  };

// Generate All History Consumption
export const getAllHistoryConsumption =
  async () => {
    const [
      overallMonthly,
      overallYearly,
      allPuroksMonthly,
      allPuroksYearly,
    ] = await Promise.all([
      getOverallMonthlyHistory(),
      getOverallYearlyHistory(),
      getAllPuroksMonthlyHistory(),
      getAllPuroksYearlyHistory(),
    ]);

    return {
      overallMonthly,
      overallYearly,
      allPuroksMonthly,
      allPuroksYearly,
    };
  };

// ==========================================
// GEMINI HELPERS
// ==========================================

const parseGeminiJson = (
  responseText
) => {
  if (
    typeof responseText !==
    "string"
  ) {
    throw new Error(
      "Gemini returned an invalid response."
    );
  }

  const cleanedText =
    responseText
      .trim()
      .replace(
        /^```(?:json)?\s*/i,
        ""
      )
      .replace(
        /\s*```$/,
        ""
      )
      .trim();

  try {
    return JSON.parse(
      cleanedText
    );
  } catch {
    throw new Error(
      `Gemini returned invalid JSON: ${cleanedText}`
    );
  }
};

const generatePrediction =
  async (prompt) => {
    if (
      !isGeminiConfigured()
    ) {
      throw new Error(
        "Gemini API is not configured."
      );
    }

    let lastError = null;

    for (
      const model of
      GEMINI_MODELS
    ) {
      try {
        console.log(
          `Trying Gemini model: ${model}`
        );

        const response =
          await ai.models
            .generateContent({
              model,
              contents: prompt,
            });

        const responseText =
          typeof response.text ===
          "function"
            ? response.text()
            : response.text;

        const parsedResponse =
          parseGeminiJson(
            responseText
          );

        console.log(
          `Gemini success using: ${model}`
        );

        return parsedResponse;
      } catch (error) {
        console.warn(
          `Gemini model ${model} failed:`,
          error.message
        );

        lastError = error;
      }
    }

    throw (
      lastError ??
      new Error(
        "All Gemini models failed."
      )
    );
  };

// ==========================================
// GEMINI PREDICTIONS
// ==========================================

// Overall Monthly Prediction
export const generateOverallMonthlyPrediction =
  async () => {
    const historical =
      await getOverallMonthlyHistory();

    if (
      historical.length === 0
    ) {
      return {
        predictedConsumption: 0,
      };
    }

    const prompt = `
You are a water demand forecasting AI.

Historical monthly water consumption:

${JSON.stringify(historical)}

Predict only the next month's total water consumption.

Rules:
- Return a non-negative number.
- Base the prediction only on the supplied history.
- Return only valid JSON.
- Do not use Markdown code fences.
- Do not include explanations.

Expected format:

{
  "predictedConsumption": 0
}
`;

    const result =
      await generatePrediction(
        prompt
      );

    return {
      predictedConsumption:
        Math.max(
          0,
          toNumber(
            result.predictedConsumption
          )
        ),
    };
  };

// Overall Yearly Prediction
export const generateOverallYearlyPrediction =
  async () => {
    const historical =
      await getOverallYearlyHistory();

    if (
      historical.length === 0
    ) {
      return {
        predictedConsumption: 0,
      };
    }

    const prompt = `
You are a water demand forecasting AI.

Historical yearly water consumption:

${JSON.stringify(historical)}

Predict only the next year's total water consumption.

Rules:
- Return a non-negative number.
- Base the prediction only on the supplied history.
- Return only valid JSON.
- Do not use Markdown code fences.
- Do not include explanations.

Expected format:

{
  "predictedConsumption": 0
}
`;

    const result =
      await generatePrediction(
        prompt
      );

    return {
      predictedConsumption:
        Math.max(
          0,
          toNumber(
            result.predictedConsumption
          )
        ),
    };
  };

// Per Purok Monthly Prediction
export const generatePerPurokMonthlyPrediction =
  async (purok) => {
    const historical =
      await getPerPurokMonthlyHistory(
        purok
      );

    if (
      historical.length === 0
    ) {
      return {
        purok,
        predictedConsumption: 0,
      };
    }

    const prompt = `
You are a water demand forecasting AI.

Purok:

${purok}

Historical monthly water consumption:

${JSON.stringify(historical)}

Predict only the next month's water consumption for this purok.

Rules:
- Return the exact purok value supplied.
- Return a non-negative number.
- Return only valid JSON.
- Do not use Markdown code fences.
- Do not include explanations.

Expected format:

{
  "purok": "${purok}",
  "predictedConsumption": 0
}
`;

    const result =
      await generatePrediction(
        prompt
      );

    return {
      purok,
      predictedConsumption:
        Math.max(
          0,
          toNumber(
            result.predictedConsumption
          )
        ),
    };
  };

// Per Purok Yearly Prediction
export const generatePerPurokYearlyPrediction =
  async (purok) => {
    const historical =
      await getPerPurokYearlyHistory(
        purok
      );

    if (
      historical.length === 0
    ) {
      return {
        purok,
        predictedConsumption: 0,
      };
    }

    const prompt = `
You are a water demand forecasting AI.

Purok:

${purok}

Historical yearly water consumption:

${JSON.stringify(historical)}

Predict only the next year's water consumption for this purok.

Rules:
- Return the exact purok value supplied.
- Return a non-negative number.
- Return only valid JSON.
- Do not use Markdown code fences.
- Do not include explanations.

Expected format:

{
  "purok": "${purok}",
  "predictedConsumption": 0
}
`;

    const result =
      await generatePrediction(
        prompt
      );

    return {
      purok,
      predictedConsumption:
        Math.max(
          0,
          toNumber(
            result.predictedConsumption
          )
        ),
    };
  };

// All Puroks Monthly Prediction
export const generateAllPuroksMonthlyPrediction =
  async () => {
    const historical =
      await getAllPuroksMonthlyHistory();

    if (
      historical.length === 0
    ) {
      return [];
    }

    const expectedPuroks =
      historical.map(
        (item) => item.purok
      );

    const prompt = `
You are a water demand forecasting AI.

Historical monthly water consumption of every purok:

${JSON.stringify(historical)}

Predict only the next month's consumption for every purok.

Rules:
- Return exactly one result for every supplied purok.
- Keep the supplied purok names unchanged.
- Each predictedConsumption must be non-negative.
- Return only a valid JSON array.
- Do not use Markdown code fences.
- Do not include explanations.

Expected format:

[
  {
    "purok": "Purok 1",
    "predictedConsumption": 0
  }
]
`;

    const result =
      await generatePrediction(
        prompt
      );

    if (!Array.isArray(result)) {
      throw new Error(
        "Gemini monthly purok prediction must return an array."
      );
    }

    const resultMap =
      new Map(
        result.map((item) => [
          item.purok,
          item,
        ])
      );

    return expectedPuroks.map(
      (purok) => ({
        purok,
        predictedConsumption:
          Math.max(
            0,
            toNumber(
              resultMap.get(
                purok
              )
                ?.predictedConsumption
            )
          ),
      })
    );
  };

// All Puroks Yearly Prediction
export const generateAllPuroksYearlyPrediction =
  async () => {
    const historical =
      await getAllPuroksYearlyHistory();

    if (
      historical.length === 0
    ) {
      return [];
    }

    const expectedPuroks =
      historical.map(
        (item) => item.purok
      );

    const prompt = `
You are a water demand forecasting AI.

Historical yearly water consumption of every purok:

${JSON.stringify(historical)}

Predict only the next year's consumption for every purok.

Rules:
- Return exactly one result for every supplied purok.
- Keep the supplied purok names unchanged.
- Each predictedConsumption must be non-negative.
- Return only a valid JSON array.
- Do not use Markdown code fences.
- Do not include explanations.

Expected format:

[
  {
    "purok": "Purok 1",
    "predictedConsumption": 0
  }
]
`;

    const result =
      await generatePrediction(
        prompt
      );

    if (!Array.isArray(result)) {
      throw new Error(
        "Gemini yearly purok prediction must return an array."
      );
    }

    const resultMap =
      new Map(
        result.map((item) => [
          item.purok,
          item,
        ])
      );

    return expectedPuroks.map(
      (purok) => ({
        purok,
        predictedConsumption:
          Math.max(
            0,
            toNumber(
              resultMap.get(
                purok
              )
                ?.predictedConsumption
            )
          ),
      })
    );
  };

// Generate All Predictions
export const generateAllPredictionsService =
  async () => {
    const [
      overallMonthly,
      overallYearly,
      allPuroksMonthly,
      allPuroksYearly,
    ] = await Promise.all([
      generateOverallMonthlyPrediction(),
      generateOverallYearlyPrediction(),
      generateAllPuroksMonthlyPrediction(),
      generateAllPuroksYearlyPrediction(),
    ]);

    return {
      overallMonthly,
      overallYearly,
      allPuroksMonthly,
      allPuroksYearly,
    };
  };

// Optional: Check available Gemini models
//
// export const listGeminiModels = async () => {
//   const models = [];
//
//   const response =
//     await ai.models.list();
//
//   for await (const model of response) {
//     models.push({
//       name: model.name,
//       displayName:
//         model.displayName,
//       description:
//         model.description,
//     });
//   }
//
//   return models;
// };