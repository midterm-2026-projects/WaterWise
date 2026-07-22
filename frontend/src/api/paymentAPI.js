import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = (configuredBaseUrl || "http://localhost:5000/api").replace(/\/$/, "");

const paymentClient = axios.create({
  baseURL: `${API_BASE_URL}/payments`,
  withCredentials: true,
  headers: { Accept: "application/json" },
});

export function normalizePaymentRecord(record) {
  return {
    ...record,
    id: record.id ?? record.paymentId ?? record.payment_id,
    billingId: record.billingId ?? record.billing_id ?? record.id,
    consumerName: record.consumerName ?? record.consumer_name ?? `Consumer #${record.user_id ?? ""}`,
    paymentDate: record.paymentDate ?? record.payment_date ?? record.payment_2_date ?? record.payment_1_date,
    paymentMethod: record.paymentMethod ?? record.payment_method ?? "Recorded payment",
    amountPaid: Number(record.amountPaid ?? record.amount_paid ?? record.payment_total ?? 0),
    remainingBalance: Number(record.remainingBalance ?? record.remaining_balance ?? 0),
    paymentStatus: record.paymentStatus ?? record.status ?? "Paid",
  };
}

export async function fetchPaymentHistory(options = {}) {
  const response = await paymentClient.get("/", options);
  const records = response.data?.data ?? [];
  return Array.isArray(records) ? records.map(normalizePaymentRecord) : [];
}

export async function fetchPaymentByBillingId(billingId, options = {}) {
  const response = await paymentClient.get(`/billing/${billingId}`, options);
  return response.data?.data ?? null;
}

export async function recordPayment(payload) {
  const response = await paymentClient.post("/", payload);
  return response.data?.data ?? response.data;
}

export default paymentClient;
