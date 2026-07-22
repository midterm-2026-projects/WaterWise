import {
  getPaymentByBillingId,
  getPaymentHistory,
  recordPayment,
} from "../services/payment.service.js";

export async function createPayment(req, res) {
  try {
    const { billingId, amount, paymentDate } = req.body;

    if (!billingId || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({
        message: "A billing ID and positive payment amount are required.",
      });
    }

    const payment = await recordPayment({
      billingId: Number(billingId),
      amount: Number(amount),
      paymentDate,
    });

    return res.status(201).json({
      message: "Payment recorded successfully.",
      data: payment,
    });
  } catch (error) {
    const notFound = error.message === "Billing record not found.";
    return res.status(notFound ? 404 : 400).json({ message: error.message });
  }
}

export async function listPayments(_req, res) {
  try {
    return res.status(200).json({ data: await getPaymentHistory() });
  } catch {
    return res.status(500).json({ message: "Failed to retrieve payment history." });
  }
}

export async function getBillingPayment(req, res) {
  try {
    const payment = await getPaymentByBillingId(Number(req.params.billingId));
    if (!payment) return res.status(404).json({ message: "Billing record not found." });
    return res.status(200).json({ data: payment });
  } catch {
    return res.status(500).json({ message: "Failed to retrieve payment details." });
  }
}
