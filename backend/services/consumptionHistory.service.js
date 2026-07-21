import { findConsumptionHistory } from "../models/consumptionHistory.model.js";

const MONTHS_IN_YEAR = 12;

function toChartPoints(record) {
  if (!Array.isArray(record.monthlyData)) {
    throw new TypeError("Consumption history monthlyData must be an array.");
  }

  if (record.monthlyData.length > MONTHS_IN_YEAR) {
    throw new RangeError("Consumption history cannot contain more than 12 months.");
  }

  return record.monthlyData.map((consumption, index) => {
    const numericConsumption = Number(consumption);

    if (!Number.isFinite(numericConsumption)) {
      throw new TypeError("Consumption history values must be numeric.");
    }

    return {
      month: `${record.year}-${String(index + 1).padStart(2, "0")}`,
      consumption: numericConsumption,
    };
  });
}

/**
 * Retrieves all matching database documents and maps every stored monthly
 * value to a chart-ready point. No limit/slice operation is applied.
 */
export async function getConsumptionHistory(filters = {}) {
  if (!Number.isInteger(filters.userId) || filters.userId < 1) {
    throw new TypeError("A valid authenticated user ID is required.");
  }

  const records = await findConsumptionHistory(filters);

  if (!Array.isArray(records)) {
    throw new TypeError("Consumption history lookup must return an array.");
  }

  return records.flatMap(toChartPoints);
}
