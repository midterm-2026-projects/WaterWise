import { getMonthlyBillingData } from "../models/monthlyPrediction.model.js";

export const generateMonthlyPrediction = () => {
  const records = getMonthlyBillingData();

  const monthlyTotals = {};

  // Aggregate monthly consumption
  records.forEach((record) => {
    const month = record.billing_date.slice(0, 7);

    monthlyTotals[month] =
      (monthlyTotals[month] || 0) + record.cubic_used;
  });

  const monthlyData = Object.entries(monthlyTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, consumption]) => ({
      month,
      consumption,
      predicted: false,
    }))
    .slice(-5);

  // Return empty array when there is no billing data
  if (monthlyData.length === 0) {
    return [];
  }

  // Compute prediction using the latest 5 historical months
  const predictedConsumption = Math.round(
    monthlyData.reduce(
      (total, month) => total + month.consumption,
      0
    ) / monthlyData.length
  );

  const [year, month] = monthlyData
    .at(-1)
    .month.split("-")
    .map(Number);

  const nextMonth = new Date(year, month, 1);

  monthlyData.push({
    month: `${nextMonth.getFullYear()}-${String(
      nextMonth.getMonth() + 1
    ).padStart(2, "0")}`,
    consumption: predictedConsumption,
    predicted: true,
  });

  return monthlyData;
};