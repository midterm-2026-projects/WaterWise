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

const calculatePrediction = (values) => {
  if (values.length === 0) {
    return 0;
  }

  if (values.length === 1) {
    return values[0];
  }

  const growth =
    (values[values.length - 1] - values[0]) /
    (values.length - 1);

  return Math.round(
    values[values.length - 1] + growth
  );
};

const getConsumptionFields = (record) => {
  return Object.keys(record).filter(
    (key) =>
      key !== "year" &&
      key !== "purok"
  );
};

// Purok Monthly Prediction
export const generatePurokMonthlyPrediction =
  () => {
    const records =
      getPurokPredictionData();

    const latestYear = Math.max(
      ...records.map(
        (record) => record.year
      )
    );

    const latestYearRecords =
      records.filter(
        (record) =>
          record.year === latestYear
      );

    return latestYearRecords.map(
      (record) => {
        const fields =
          getConsumptionFields(record);

        const historical =
          fields.map((field) => ({
            period: field,
            consumption:
              record[field],
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
  () => {
    const records =
      getPurokPredictionData();

    const puroks = [
      ...new Set(
        records.map(
          (record) =>
            record.purok
        )
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
                a.year - b.year
            )
            .map((record) => {
              const totalConsumption =
                getConsumptionFields(
                  record
                ).reduce(
                  (
                    sum,
                    field
                  ) =>
                    sum +
                    record[field],
                  0
                );

              return {
                year:
                  record.year,
                consumption:
                  totalConsumption,
              };
            });

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
  () => {
    const records =
      getMonthlyBillingData();

    const monthlyTotals = {};

    records.forEach((record) => {
      const month =
        record.billing_date.slice(
          0,
          7
        );

      monthlyTotals[month] =
        (monthlyTotals[month] ||
          0) +
        record.cubic_used;
    });

    const monthlyData =
      Object.entries(
        monthlyTotals
      )
        .sort(([a], [b]) =>
          a.localeCompare(b)
        )
        .map(
          ([
            month,
            consumption,
          ]) => ({
            month,
            consumption,
            predicted:
              false,
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
          (
            total,
            month
          ) =>
            total +
            month.consumption,
          0
        ) /
          monthlyData.length
      );

    const [
      year,
      month,
    ] = monthlyData
      .at(-1)
      .month.split("-")
      .map(Number);

    const nextMonth =
      new Date(
        year,
        month,
        1
      );

    monthlyData.push({
      month: `${nextMonth.getFullYear()}-${String(
        nextMonth.getMonth() + 1
      ).padStart(2, "0")}`,
      consumption:
        predictedConsumption,
      predicted: true,
    });

    return monthlyData;
  };

// Overall Yearly Prediction
export const generateYearlyPrediction =
  () => {
    const records =
      getYearlyBillingData();

    const yearlyTotals = {};

    records.forEach((record) => {
      const year =
        record.billing_date.slice(
          0,
          4
        );

      yearlyTotals[year] =
        (yearlyTotals[year] ||
          0) +
        record.cubic_used;
    });

    const yearlyData =
      Object.entries(
        yearlyTotals
      )
        .sort(([a], [b]) =>
          a.localeCompare(b)
        )
        .map(
          ([
            year,
            consumption,
          ]) => ({
            year: Number(
              year
            ),
            consumption,
            predicted:
              false,
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
          (
            total,
            year
          ) =>
            total +
            year.consumption,
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

// Rankings

export const getConsumptionRanking = () => {
  const data = getPurokConsumptionRanking();

  return [...data]
    .sort((a, b) => b.consumption - a.consumption)
    .map((item, index) => ({
      rank: index + 1,
      ...item,
    }));
};

//New aggregation function

// Overall Monthly History
export const getOverallMonthlyHistory = () => {
  const records = getPurokPredictionData();

  const latestYear = Math.max(
    ...records.map((record) => record.year)
  );

  const latestRecords = records.filter(
    (record) => record.year === latestYear
  );

  const totals = {};

  latestRecords.forEach((record) => {
    getConsumptionFields(record).forEach((month) => {
      totals[month] =
        (totals[month] || 0) + record[month];
    });
  });

  return Object.entries(totals).map(
    ([month, consumption]) => ({
      month,
      consumption,
    })
  );
};

// Overall Yearly History
export const getOverallYearlyHistory = () => {
  const records = getPurokPredictionData();

  const yearlyTotals = {};

  records.forEach((record) => {
    const total = getConsumptionFields(record).reduce(
      (sum, month) => sum + record[month],
      0
    );

    yearlyTotals[record.year] =
      (yearlyTotals[record.year] || 0) + total;
  });

  return Object.entries(yearlyTotals).map(
    ([year, consumption]) => ({
      year: Number(year),
      consumption,
    })
  );
};

// Purok Monthly History
export const getPerPurokMonthlyHistory = (
  purok
) => {
  const records = getPurokPredictionData();

  const latestYear = Math.max(
    ...records.map((record) => record.year)
  );

  const record = records.find(
    (item) =>
      item.year === latestYear &&
      item.purok === purok
  );

  if (!record) {
    return [];
  }

  return getConsumptionFields(record).map(
    (month) => ({
      month,
      consumption: record[month],
    })
  );
};

// All Puroks Monthly History
export const getAllPuroksMonthlyHistory =
  () => {
    const records = getPurokPredictionData();

    const latestYear = Math.max(
      ...records.map((record) => record.year)
    );

    return records
      .filter(
        (record) => record.year === latestYear
      )
      .map((record) => ({
        purok: record.purok,
        historical:
          getConsumptionFields(record).map(
            (month) => ({
              month,
              consumption: record[month],
            })
          ),
      }));
  };

// New prediction function

const generatePrediction = async (prompt) => {
  if (!isGeminiConfigured()) {
    throw new Error("Gemini API is not configured.");
  }

  let lastError;

  for (const model of GEMINI_MODELS) {
    try {
      console.log(`Trying model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      console.log(`Success using ${model}`);

      return JSON.parse(response.text);
    } catch (error) {
      console.warn(`Model ${model} failed`);

      lastError = error;
    }
  }

  throw lastError;
};


// Overall Monthly Prediction
export const generateOverallMonthlyPrediction =
async () => {

  const historical =
    getOverallMonthlyHistory();

  const prompt = `
You are a water demand forecasting AI.

Historical monthly water consumption:

${JSON.stringify(historical)}

Predict ONLY the NEXT month.

Return ONLY JSON.

{
  "predictedConsumption": number
}
`;

  return await generatePrediction(prompt);

};

// Overall Yearly Prediction
export const generateOverallYearlyPrediction =
async () => {

  const historical =
    getOverallYearlyHistory();

  const prompt = `
Historical yearly water consumption

${JSON.stringify(historical)}

Predict ONLY the NEXT year.

Return ONLY JSON.

{
 "predictedConsumption":number
}
`;

  return await generatePrediction(prompt);

};

// Per Purok Monthly Prediction
export const generatePerPurokMonthlyPrediction =
async (purok) => {

  const historical =
    getPerPurokMonthlyHistory(
      purok
    );

  const prompt = `
Purok

${purok}

Historical monthly consumption

${JSON.stringify(historical)}

Predict ONLY the NEXT month.

Return ONLY JSON.

{
 "purok":"${purok}",
 "predictedConsumption":number
}
`;

  return await generatePrediction(prompt);

};
