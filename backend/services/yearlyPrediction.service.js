import { getYearlyBillingData } from "../models/yearlyPrediction.model.js";

export const generateYearlyPrediction = () => {
  const records = getYearlyBillingData();

  const yearlyTotals = {};

  // Aggregate yearly consumption
  records.forEach((record) => {
    const year = record.billing_date.slice(0, 4);

    yearlyTotals[year] =
      (yearlyTotals[year] || 0) + record.cubic_used;
  });

  const yearlyData = Object.entries(yearlyTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, consumption]) => ({
      year: Number(year),
      consumption,
      predicted: false,
    }))
    .slice(-5);

  // Return empty array when there is no billing data
  if (yearlyData.length === 0) {
    return [];
  }

  // Compute prediction using the latest 5 historical years
  const predictedConsumption = Math.round(
    yearlyData.reduce(
      (total, year) => total + year.consumption,
      0
    ) / yearlyData.length
  );

  yearlyData.push({
    year: yearlyData.at(-1).year + 1,
    consumption: predictedConsumption,
    predicted: true,
  });

  return yearlyData;
};