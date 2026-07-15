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

  describe(
    "recordPayment",
    () => {
      it(
        "should record the first payment",
        () => {
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
            (_, updated) =>
              updated
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

          expect(
            result.status
          ).toBe(
            "Partially Paid"
          );
        }
      );

      it(
        "should record the second payment",
        () => {
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
            (_, updated) =>
              updated
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

          expect(
            result.status
          ).toBe("Paid");
        }
      );

      it(
        "should update the billing record",
        () => {
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
            (_, updated) =>
              updated
          );

          // Act
          recordPayment({
            billingId: 1,
            amount: 100,
          });

          // Assert
          expect(
            billingModel.updateBillingRecord
          ).toHaveBeenCalledOnce();
        }
      );

      it(
        "should update the remaining balance correctly",
        () => {
          // Arrange
          billingModel.fetchBillingRecordById.mockReturnValue(
            {
              id: 1,
              total_bill: 500,
              payment_1: 0,
              payment_2: 0,
              payment_total: 0,
              remaining_balance: 500,
            }
          );

          billingModel.updateBillingRecord.mockImplementation(
            (_, updated) =>
              updated
          );

          // Act
          const result =
            recordPayment({
              billingId: 1,
              amount: 250,
            });

          // Assert
          expect(
            result.remaining_balance
          ).toBe(250);

          expect(
            result.payment_total
          ).toBe(250);
        }
      );

      it(
        "should reject overpayment",
        () => {
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
        }
      );

      it(
        "should throw an error when the billing record does not exist",
        () => {
          // Arrange
          billingModel.fetchBillingRecordById.mockReturnValue(
            null
          );

          // Act & Assert
          expect(() =>
            recordPayment({
              billingId: 999,
              amount: 100,
            })
          ).toThrow();
        }
      );

      it(
        "should keep the payment status as partially paid after the first payment",
        () => {
          // Arrange
          billingModel.fetchBillingRecordById.mockReturnValue(
            {
              id: 1,
              total_bill: 400,
              payment_1: 0,
              payment_2: 0,
              payment_total: 0,
              remaining_balance: 400,
            }
          );

          billingModel.updateBillingRecord.mockImplementation(
            (_, updated) =>
              updated
          );

          // Act
          const result =
            recordPayment({
              billingId: 1,
              amount: 100,
            });

          // Assert
          expect(
            result.status
          ).toBe(
            "Partially Paid"
          );
        }
      );
    }
  );

  describe(
    "getPaymentHistory",
    () => {
      it(
        "should return payment history",
        () => {
          // Arrange

          // Act
          const result =
            getPaymentHistory();

          // Assert
          expect(result).toEqual(
            []
          );
        }
      );

      it(
        "should return an array",
        () => {
          // Arrange

          // Act
          const result =
            getPaymentHistory();

          // Assert
          expect(
            Array.isArray(result)
          ).toBe(true);
        }
      );
    }
  );

  describe(
    "getPaymentByBillingId",
    () => {
      it(
        "should fetch a billing payment record",
        () => {
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
          ).toHaveBeenCalledWith(
            1
          );

          expect(
            result.id
          ).toBe(1);
        }
      );

      it(
        "should return undefined when billing record does not exist",
        () => {
          // Arrange
          billingModel.fetchBillingRecordById.mockReturnValue(
            undefined
          );

          // Act
          const result =
            getPaymentByBillingId(
              999
            );

          // Assert
          expect(
            result
          ).toBeUndefined();
        }
      );

      it(
        "should call fetchBillingRecordById once",
        () => {
          // Arrange
          billingModel.fetchBillingRecordById.mockReturnValue(
            {}
          );

          // Act
          getPaymentByBillingId(
            1
          );

          // Assert
          expect(
            billingModel.fetchBillingRecordById
          ).toHaveBeenCalledOnce();
        }
      );

      it(
        "should return the billing record",
        () => {
          // Arrange
          const billing = {
            id: 5,
            status: "Paid",
          };

          billingModel.fetchBillingRecordById.mockReturnValue(
            billing
          );

          // Act
          const result =
            getPaymentByBillingId(
              5
            );

          // Assert
          expect(result).toEqual(
            billing
          );
        }
      );
    }
  );
});