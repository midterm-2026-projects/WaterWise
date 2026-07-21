import {
  fetchBillingRecordById,
  updateBillingRecord,
} from "../models/billing.model.js";

function applyPayment(billingId, amount, paymentDate, billing) {
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

  let payment1 = billing.payment_1;
  let payment2 = billing.payment_2;

  let payment1Date =
    billing.payment_1_date;
  let payment2Date =
    billing.payment_2_date;

  if (payment1 === 0) {
    payment1 = amount;
    payment1Date = paymentDate;
  } else {
    payment2 = amount;
    payment2Date = paymentDate;
  }

  const paymentTotal =
    payment1 + payment2;

  const remainingBalance =
    billing.total_bill -
    paymentTotal;

  let status = "Unpaid";

  if (remainingBalance === 0) {
    status = "Paid";
  } else if (paymentTotal > 0) {
    status = "Partially Paid";
  }

  return updateBillingRecord(
    billingId,
    {
      payment_1: payment1,
      payment_2: payment2,
      payment_1_date:
        payment1Date,
      payment_2_date:
        payment2Date,
      payment_total:
        paymentTotal,
      remaining_balance:
        remainingBalance,
      status,
    }
  );
}

export function recordPayment({
  billingId,
  amount,
  paymentDate = new Date()
    .toISOString()
    .split("T")[0],
}) {
  const billing = fetchBillingRecordById(billingId);

  if (billing && typeof billing.then === "function") {
    return billing.then((record) => applyPayment(billingId, amount, paymentDate, record));
  }

  return applyPayment(billingId, amount, paymentDate, billing);
}

export function getPaymentHistory() {
  return [];
}

export function getPaymentByBillingId(
  billingId
) {
  return fetchBillingRecordById(
    billingId
  );
}