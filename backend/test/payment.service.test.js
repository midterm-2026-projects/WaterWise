import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  recordPayment,
  getPaymentHistory,
  getPaymentByBillingId,
} from "../services/payment.service.js";

import * as billingModel from "../models/billing.model.js";

vi.mock("../models/billing.model.js", () => ({
  fetchBillingRecordById:
    vi.fn(),
  updateBillingRecord:
    vi.fn(),
}));

describe("Payment Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should record the first payment", () => {
    // Arrange
    billingModel.fetchBillingRecordById.mockReturnValue(
      {
        id: 1,
        total_bill: 300,
        payment_1: 0,
        payment_2: 0,
        payment_total: 0,
        remaining_balance: 300,
      }
    );

    billingModel.updateBillingRecord.mockImplementation(
      (_, updated) => updated
    );

    // Act
    const result =
      recordPayment({
        billingId: 1,
        amount: 100,
      });

    // Assert
    expect(
      result.payment_1
    ).toBe(100);

    expect(
      result.payment_total
    ).toBe(100);

    expect(
      result.remaining_balance
    ).toBe(200);

    expect(result.status).toBe(
      "Partially Paid"
    );
  });

  it("should record the second payment", () => {
    // Arrange
    billingModel.fetchBillingRecordById.mockReturnValue(
      {
        id: 1,
        total_bill: 300,
        payment_1: 100,
        payment_2: 0,
        payment_total: 100,
        remaining_balance: 200,
      }
    );

    billingModel.updateBillingRecord.mockImplementation(
      (_, updated) => updated
    );

    // Act
    const result =
      recordPayment({
        billingId: 1,
        amount: 200,
      });

    // Assert
    expect(
      result.payment_2
    ).toBe(200);

    expect(
      result.payment_total
    ).toBe(300);

    expect(
      result.remaining_balance
    ).toBe(0);

    expect(result.status).toBe(
      "Paid"
    );
  });

  it("should reject overpayment", () => {
    // Arrange
    billingModel.fetchBillingRecordById.mockReturnValue(
      {
        remaining_balance: 100,
      }
    );

    // Act & Assert
    expect(() =>
      recordPayment({
        billingId: 1,
        amount: 200,
      })
    ).toThrow(
      "Payment exceeds remaining balance."
    );
  });

  it("should return payment history", () => {
    // Arrange

    // Act
    const result =
      getPaymentHistory();

    // Assert
    expect(result).toEqual([]);
  });

  it("should fetch a billing payment record", () => {
    // Arrange
    billingModel.fetchBillingRecordById.mockReturnValue(
      {
        id: 1,
      }
    );

    // Act
    const result =
      getPaymentByBillingId(
        1
      );

    // Assert
    expect(
      billingModel.fetchBillingRecordById
    ).toHaveBeenCalledWith(1);

    expect(result.id).toBe(1);
  });
});