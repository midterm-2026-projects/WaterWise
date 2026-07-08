import {
  getPurokPredictionData,
  getMonthlyBillingData,
  getYearlyBillingData,
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

/* ---------------------------------------
   Purok Monthly Prediction
--------------------------------------- */

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

/* ---------------------------------------
   Purok Yearly Prediction
--------------------------------------- */

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

/* ---------------------------------------
   Overall Monthly Prediction
--------------------------------------- */

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

/* ---------------------------------------
   Overall Yearly Prediction
--------------------------------------- */

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