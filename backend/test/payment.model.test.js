import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import {
  paymentTransactions,
} from "../data/paymentData.js";

import {
  fetchPayments,
  fetchPaymentById,
  createPayment,
} from "../models/payment.model.js";

describe("Payment Model", () => {
  const originalPayments = structuredClone(
    paymentTransactions
  );

  beforeEach(() => {
    paymentTransactions.length = 0;
    paymentTransactions.push(
      ...structuredClone(originalPayments)
    );
  });

  it("should fetch all payment transactions", () => {
    // Arrange

    // Act
    const result = fetchPayments();

    // Assert
    expect(result).toHaveLength(
      originalPayments.length
    );
  });

  it("should fetch a payment by payment ID", () => {
    // Arrange
    const paymentId = "PAY-001";

    // Act
    const result =
      fetchPaymentById(paymentId);

    // Assert
    expect(result).toBeDefined();
    expect(result.paymentId).toBe(
      paymentId
    );
  });

  it("should return undefined for an unknown payment ID", () => {
    // Arrange

    // Act
    const result =
      fetchPaymentById("INVALID");

    // Assert
    expect(result).toBeUndefined();
  });

  it("should create a new payment transaction", () => {
    // Arrange
    const newPayment = {
      paymentId: "PAY-999",
      invoiceNumber: "INV-2026-999",
      consumerName:
        "Test Consumer",
      paymentDate: "2026-09-30",
      paymentMethod: "Cash",
      amountPaid: 1000,
      remainingBalance: 0,
      paymentStatus: "Paid",
    };

    // Act
    const created =
      createPayment(newPayment);

    // Assert
    expect(created).toEqual(
      newPayment
    );

    expect(
      paymentTransactions
    ).toContainEqual(newPayment);

    expect(
      paymentTransactions
    ).toHaveLength(
      originalPayments.length + 1
    );
  });
});