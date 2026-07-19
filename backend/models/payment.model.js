import { paymentTransactions } from "../data/paymentData.js";

export function fetchPayments() {
  return paymentTransactions;
}

export function fetchPaymentById(paymentId) {
  return paymentTransactions.find(
    (payment) =>
      payment.paymentId === paymentId
  );
}

export function createPayment(payment) {
  paymentTransactions.push(payment);

  return payment;
}