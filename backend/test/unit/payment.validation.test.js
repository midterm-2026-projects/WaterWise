import {
  describe,
  expect,
  it,
} from "vitest";

import {
  validatePayment,
} from "../../validation/payment.validation.js";

describe("Payment Validation", () => {
  it("should validate a correct payment", () => {
    // Arrange
    const payment = {
      invoiceNumber: "INV-2026-001",
      consumerName: "Juan Dela Cruz",
      paymentDate: "2026-06-30",
      paymentMethod: "Cash",
      amountPaid: 1000,
    };

    // Act
    const result =
      validatePayment(payment);

    // Assert
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("should require an invoice number", () => {
    // Arrange
    const payment = {
      invoiceNumber: "",
      consumerName: "Juan Dela Cruz",
      paymentDate: "2026-06-30",
      paymentMethod: "Cash",
      amountPaid: 1000,
    };

    // Act
    const result =
      validatePayment(payment);

    // Assert
    expect(result.valid).toBe(false);

    expect(
      result.errors.invoiceNumber
    ).toBe(
      "Invoice Number is required."
    );
  });

  it("should require a consumer name", () => {
    // Arrange
    const payment = {
      invoiceNumber: "INV-2026-001",
      consumerName: "",
      paymentDate: "2026-06-30",
      paymentMethod: "Cash",
      amountPaid: 1000,
    };

    // Act
    const result =
      validatePayment(payment);

    // Assert
    expect(result.valid).toBe(false);

    expect(
      result.errors.consumerName
    ).toBe(
      "Consumer Name is required."
    );
  });

  it("should require a payment date", () => {
    // Arrange
    const payment = {
      invoiceNumber: "INV-2026-001",
      consumerName: "Juan Dela Cruz",
      paymentDate: "",
      paymentMethod: "Cash",
      amountPaid: 1000,
    };

    // Act
    const result =
      validatePayment(payment);

    // Assert
    expect(result.valid).toBe(false);

    expect(
      result.errors.paymentDate
    ).toBe(
      "Payment Date is required."
    );
  });

  it("should require a payment method", () => {
    // Arrange
    const payment = {
      invoiceNumber: "INV-2026-001",
      consumerName: "Juan Dela Cruz",
      paymentDate: "2026-06-30",
      paymentMethod: "",
      amountPaid: 1000,
    };

    // Act
    const result =
      validatePayment(payment);

    // Assert
    expect(result.valid).toBe(false);

    expect(
      result.errors.paymentMethod
    ).toBe(
      "Payment Method is required."
    );
  });

  it("should require an amount paid", () => {
    // Arrange
    const payment = {
      invoiceNumber: "INV-2026-001",
      consumerName: "Juan Dela Cruz",
      paymentDate: "2026-06-30",
      paymentMethod: "Cash",
      amountPaid: "",
    };

    // Act
    const result =
      validatePayment(payment);

    // Assert
    expect(result.valid).toBe(false);

    expect(
      result.errors.amountPaid
    ).toBe(
      "Amount Paid is required."
    );
  });

  it("should reject zero payment", () => {
    // Arrange
    const payment = {
      invoiceNumber: "INV-2026-001",
      consumerName: "Juan Dela Cruz",
      paymentDate: "2026-06-30",
      paymentMethod: "Cash",
      amountPaid: 0,
    };

    // Act
    const result =
      validatePayment(payment);

    // Assert
    expect(result.valid).toBe(false);

    expect(
      result.errors.amountPaid
    ).toBe(
      "Amount Paid must be greater than zero."
    );
  });

  it("should reject a negative payment amount", () => {
    // Arrange
    const payment = {
      invoiceNumber: "INV-2026-001",
      consumerName: "Juan Dela Cruz",
      paymentDate: "2026-06-30",
      paymentMethod: "Cash",
      amountPaid: -500,
    };

    // Act
    const result =
      validatePayment(payment);

    // Assert
    expect(result.valid).toBe(false);

    expect(
      result.errors.amountPaid
    ).toBe(
      "Amount Paid must be greater than zero."
    );
  });
});