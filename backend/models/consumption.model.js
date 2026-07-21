// backend/models/consumption.model.js
import { supabase } from "../config/supabase.js";

const MONTHS = [
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
  return Number(value ?? 0);
};

const formatPurok = (purokNo) => {
  return `Purok ${purokNo}`;
};

// Common consumption query
const fetchConsumptionRecords = async () => {
  const { data, error } = await supabase
    .from("consumption")
    .select(`
      id,
      consumer_id,
      reading_date,
      previous_reading,
      present_reading,
      consumption,
      consumers!consumption_consumer_id_fkey (
        id,
        full_name,
        purok_no
      )
    `)
    .order("reading_date", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Failed to retrieve consumption records: ${error.message}`
    );
  }

  return data ?? [];
};

// Used by:
// getOverallMonthlyHistory
// getOverallYearlyHistory
// getPerPurokMonthlyHistory
// getPerPurokYearlyHistory
// getAllPuroksMonthlyHistory
// getAllPuroksYearlyHistory
export const getPurokPredictionData = async () => {
  const records =
    await fetchConsumptionRecords();

  const groupedRecords = new Map();

  records.forEach((record) => {
    const purokNo =
      record.consumers?.purok_no;

    if (
      purokNo === null ||
      purokNo === undefined ||
      !record.reading_date
    ) {
      return;
    }

    const date =
      new Date(record.reading_date);

    const year =
      date.getUTCFullYear();

    const monthIndex =
      date.getUTCMonth();

    const month =
      MONTHS[monthIndex];

    const key =
      `${purokNo}-${year}`;

    if (!groupedRecords.has(key)) {
      groupedRecords.set(key, {
        purok: formatPurok(purokNo),
        year,
        january: 0,
        february: 0,
        march: 0,
        april: 0,
        may: 0,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        october: 0,
        november: 0,
        december: 0,
      });
    }

    const groupedRecord =
      groupedRecords.get(key);

    groupedRecord[month] +=
      toNumber(record.consumption);
  });

  return [...groupedRecords.values()]
    .sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }

      return a.purok.localeCompare(
        b.purok,
        undefined,
        {
          numeric: true,
        }
      );
    });
};

// Used by generateMonthlyPrediction
export const getMonthlyBillingData =
  async () => {
    const records =
      await fetchConsumptionRecords();

    return records.map((record) => ({
      billing_date:
        record.reading_date,
      cubic_used:
        toNumber(record.consumption),
    }));
  };

// Used by generateYearlyPrediction
export const getYearlyBillingData =
  async () => {
    const records =
      await fetchConsumptionRecords();

    return records.map((record) => ({
      billing_date:
        record.reading_date,
      cubic_used:
        toNumber(record.consumption),
    }));
  };

// Used by getConsumptionRanking
export const getPurokConsumptionRanking =
  async () => {
    const records =
      await fetchConsumptionRecords();

    const purokTotals = new Map();

    records.forEach((record) => {
      const purokNo =
        record.consumers?.purok_no;

      if (
        purokNo === null ||
        purokNo === undefined
      ) {
        return;
      }

      const purok =
        formatPurok(purokNo);

      const currentTotal =
        purokTotals.get(purok) ?? 0;

      purokTotals.set(
        purok,
        currentTotal +
          toNumber(record.consumption)
      );
    });

    return [...purokTotals.entries()]
      .map(
        ([purok, consumption]) => ({
          purok,
          consumption,
        })
      );
  };