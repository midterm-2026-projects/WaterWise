import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = (configuredBaseUrl || "http://localhost:5000/api").replace(/\/$/, "");

const billingClient = axios.create({
  baseURL: `${API_BASE_URL}/billing`,
  withCredentials: true,
  headers: { Accept: "application/json" },
});

function formatMonth(value) {
  if (!value) return "Unknown period";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function normalizeBillingRecord(record) {
  const reading = record.consumption ?? {};
  return {
    id: record.id,
    invoiceNumber: `INV-${record.id}`,
    consumerName:
      record.consumer?.full_name ??
      record.consumers?.full_name ??
      record.consumer_name ??
      `Consumer #${record.user_id}`,
    billingPeriod: formatMonth(record.billing_date),
    readingDate: reading.reading_date ?? record.billing_date,
    cubicMetersConsumed: Number(reading.consumption ?? record.cubic_used ?? 0),
    amountDue: Number(record.total_bill ?? 0),
    outstandingBalance: Number(record.remaining_balance ?? 0),
    status: record.status ?? "Unpaid",
    address: record.consumer?.purok ?? record.address ?? "Address not available",
    previousReading: Number(reading.previous_reading ?? 0),
    currentReading: Number(reading.present_reading ?? 0),
    dueDate: record.due_date,
    raw: record,
  };
}

export async function fetchBillingHistory(options = {}) {
  const response = await billingClient.get("/history", options);
  const records = response.data ?? [];
  return Array.isArray(records) ? records.map(normalizeBillingRecord) : [];
}

export async function fetchCurrentBilling(options = {}) {
  const response = await billingClient.get("/current", options);
  return response.data;
}

export default billingClient;
