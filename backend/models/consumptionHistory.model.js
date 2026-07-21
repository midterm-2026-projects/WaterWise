import { supabase } from "../config/supabase.js";
import consumptionHistoryCollection from "../data/consumptionHistory.collection.js";

export async function findConsumptionHistory({ userId, year } = {}) {
  if (!Number.isInteger(userId) || userId < 1) {
    throw new TypeError("A valid authenticated user ID is required.");
  }

  if (
    process.env.NODE_ENV === "test" ||
    process.env.WATERWISE_E2E === "true"
  ) {
    return consumptionHistoryCollection
      .filter((record) => record.userId === userId)
      .filter((record) => year === undefined || record.year === year)
      .map((record) => ({ ...record, monthlyData: [...record.monthlyData] }));
  }

  let query = supabase
    .from("consumption")
    .select("id, consumer_id, reading_date, consumption")
    .eq("consumer_id", userId)
    .order("reading_date", { ascending: true });

  if (year !== undefined) {
    query = query
      .gte("reading_date", `${year}-01-01`)
      .lt("reading_date", `${year + 1}-01-01`);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  const historyByYear = new Map();

  for (const record of data ?? []) {
    const readingDate = new Date(`${record.reading_date}T00:00:00Z`);
    const readingYear = readingDate.getUTCFullYear();
    const monthIndex = readingDate.getUTCMonth();

    if (!historyByYear.has(readingYear)) {
      historyByYear.set(readingYear, Array(12).fill(0));
    }

    historyByYear.get(readingYear)[monthIndex] += Number(record.consumption ?? 0);
  }

  return [...historyByYear.entries()].map(([readingYear, monthlyData]) => ({
    id: `history-${userId}-${readingYear}`,
    userId,
    year: readingYear,
    monthlyData,
  }));
}
