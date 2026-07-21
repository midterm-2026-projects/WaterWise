import { apiRequest } from "./apiClient";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function formatDate(value) {
  return value ? dateFormatter.format(new Date(`${value}T00:00:00Z`)) : "";
}

function formatMonth(value) {
  return value ? monthFormatter.format(new Date(`${value}T00:00:00Z`)) : "No readings";
}

function invoiceNumber(id) {
  const value = String(id);
  return /^\d{7}$/.test(value)
    ? `INV-${value.slice(0, 4)}-${value.slice(4)}`
    : `INV-${value}`;
}

function mapBillingRecord(record, profile) {
  const reading = record.consumption ?? record;

  return {
    invoiceNumber: invoiceNumber(record.id),
    name: profile?.name ?? profile?.full_name ?? "Consumer",
    billingPeriod: formatMonth(record.billing_date),
    readingDate: reading.reading_date ?? record.billing_date,
    cubicMetersConsumed: Number(reading.consumption ?? record.cubic_used ?? 0),
    amountDue: Number(record.total_bill ?? 0),
    remainingBalance: Number(record.remaining_balance ?? 0),
    status: record.status ?? "Unpaid",
    address: profile?.purok ?? "",
    previousReading: Number(reading.previous_reading ?? 0),
    currentReading: Number(reading.present_reading ?? 0),
    dueDate: record.due_date,
  };
}

export async function fetchConsumerProfile(options) {
  const profile = await apiRequest("/api/profile", options);
  const readings = profile.readings ?? [];
  const invoices = profile.invoices ?? [];
  const latestReading = readings
    .slice()
    .sort((a, b) => String(b.reading_date).localeCompare(String(a.reading_date)))[0] ?? {};
  const pendingInvoices = invoices.filter(
    (invoice) => Number(invoice.remaining_balance ?? invoice.amount_due ?? 0) > 0
  );
  const nextInvoice = pendingInvoices
    .slice()
    .sort((a, b) => String(a.due_date).localeCompare(String(b.due_date)))[0];

  return {
    accountId: profile.accountId ?? `ACC-${profile.id}`,
    name: profile.name ?? profile.full_name ?? profile.username,
    purok: profile.purok ?? (profile.purok_no ? `Purok ${profile.purok_no}` : "Not provided"),
    houseNumber: profile.house_number ?? "Not provided",
    email: profile.email,
    contactNumber: profile.phone ?? "Not provided",
    meterNumber: profile.meter_number ?? "Not provided",
    status: profile.status ?? "active",
    activeAmountDue: pendingInvoices.reduce(
      (total, invoice) =>
        total + Number(invoice.remaining_balance ?? invoice.amount_due ?? 0),
      0
    ),
    dueDate: formatDate(nextInvoice?.due_date),
    latestMonth: formatMonth(latestReading.reading_date),
    volumetricUsage: Number(latestReading.consumption ?? 0),
    previousReading: Number(latestReading.previous_reading ?? 0),
    currentReading: Number(latestReading.present_reading ?? 0),
    lastReadingDate: latestReading.reading_date ?? "No reading recorded",
  };
}

export async function fetchBillingLedger(options) {
  const [records, profile] = await Promise.all([
    apiRequest("/api/billing/history", options),
    apiRequest("/api/profile", options),
  ]);

  const historyData = records.map((record) => mapBillingRecord(record, profile));
  const pending = historyData.filter((record) => record.remainingBalance > 0);
  const nextDue = pending
    .slice()
    .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)))[0];
  const latest = historyData[0];

  return {
    historyData,
    ledgerAccount: {
      accountId: profile.accountId ?? `ACC-${profile.id}`,
      name: profile.name ?? profile.full_name ?? profile.username,
      outstandingBalance: pending.reduce(
        (total, record) => total + record.remainingBalance,
        0
      ),
      dueDate: formatDate(nextDue?.dueDate),
    },
    officialReceipt: latest
      ? {
          meterName: profile.meter_number ?? `CONSUMER-${profile.id}`,
          runDate: formatDate(latest.readingDate),
          previousReading: latest.previousReading,
          presentReading: latest.currentReading,
          baselineBill: latest.amountDue,
          arrears30Days: 0,
          arrears60Days: 0,
          arrears90Days: 0,
        }
      : null,
  };
}

export async function fetchCurrentBalance(options) {
  const payload = await apiRequest("/api/billing/current", options);
  const balance = Number(payload?.unpaid_balance_total);

  if (!Number.isFinite(balance)) {
    throw new TypeError("The server returned an invalid current balance.");
  }

  return balance;
}

export async function fetchNotifications(options) {
  const payload = await apiRequest("/api/notifications", options);
  const rows = [
    ...(payload.streams?.accountBills ?? []),
    ...(payload.streams?.adminAnnouncements ?? []),
  ];

  return rows.map((notification) => ({
    id: notification.id,
    category: notification.category,
    title: notification.title,
    message: notification.message,
    isRead: Boolean(notification.is_read),
    actionPath:
      notification.category === "bill"
        ? "/consumer/billing-ledger?receipt=official"
        : undefined,
  }));
}

export function markNotificationRead(id) {
  return apiRequest(`/api/notifications/${id}/read`, { method: "PUT" });
}

export function deleteNotification(id) {
  return apiRequest(`/api/notifications/${id}`, { method: "DELETE" });
}
