import {
  fetchBillingRecords,
  fetchBillingRecordById,
  insertBillingRecord,
  updateBillingRecord,
} from "../models/billing.model.js";

const WATER_RATE = 15;

export function calculateBillingAmount(
  previousReading,
  presentReading,
  penalty = 0,
  otherCharges = 0
) {
  const cubicUsed =
    presentReading - previousReading;

  const currentBill =
    cubicUsed * WATER_RATE;

  const totalBill =
    currentBill +
    penalty +
    otherCharges;

  return {
    cubic_used: cubicUsed,
    current_bill: currentBill,
    total_bill: totalBill,
  };
}

export function generateBillingRecord({
  id,
  user_id,
  name,
  previous_reading,
  present_reading,
  billing_date,
  due_date,
}) {
  const billing =
    calculateBillingAmount(
      previous_reading,
      present_reading
    );

  const record = {
    id,
    user_id,
    name,
    previous_reading,
    present_reading,

    cubic_used:
      billing.cubic_used,

    cubic_used_last_month: 0,

    current_bill:
      billing.current_bill,

    total_bill:
      billing.total_bill,

    payment_1: 0,
    payment_2: 0,
    payment_total: 0,

    remaining_balance:
      billing.total_bill,

    billing_date,
    due_date,

    status: "Unpaid",

    created_at:
      new Date().toISOString(),

    payment_1_date: null,
    payment_2_date: null,

    reference_code: `REF-${Date.now()}`,
  };

  return insertBillingRecord(
    record
  );
}

function applyPayment(billingId, amount, billing) {
  if (!billing) {
    throw new Error(
      "Billing record not found."
    );
  }

  if (
    amount >
    billing.remaining_balance
  ) {
    throw new Error(
      "Payment exceeds remaining balance."
    );
  }

  let payment1 =
    billing.payment_1;

  let payment2 =
    billing.payment_2;

  let payment1Date =
    billing.payment_1_date;

  let payment2Date =
    billing.payment_2_date;

  if (payment1 === 0) {
    payment1 = amount;
    payment1Date =
      new Date().toISOString();
  } else {
    payment2 = amount;
    payment2Date =
      new Date().toISOString();
  }

  const paymentTotal =
    payment1 + payment2;

  const remainingBalance =
    billing.total_bill -
    paymentTotal;

  let status = "Unpaid";

  if (remainingBalance <= 0) {
    status = "Paid";
  } else if (
    paymentTotal > 0
  ) {
    status =
      "Partially Paid";
  }

  return updateBillingRecord(
    billingId,
    {
      payment_1: payment1,
      payment_2: payment2,

      payment_total:
        paymentTotal,

      payment_1_date:
        payment1Date,

      payment_2_date:
        payment2Date,

      remaining_balance:
        remainingBalance,

      status,
    }
  );
}

export function processPayment(
  billingId,
  amount
) {
  const billing = fetchBillingRecordById(billingId);

  if (billing && typeof billing.then === "function") {
    return billing.then((record) => applyPayment(billingId, amount, record));
  }

  return applyPayment(billingId, amount, billing);
}

export function fetchAllBilling(userId) {
  return fetchBillingRecords(userId);
}

export function fetchBilling(id) {
  return fetchBillingRecordById(
    id
  );
}