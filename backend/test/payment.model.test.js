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
  const originalPayments =
    structuredClone(
      paymentTransactions
    );

  beforeEach(() => {
    paymentTransactions.length = 0;

    paymentTransactions.push(
      ...structuredClone(
        originalPayments
      )
    );
  });

  describe(
    "fetchPayments",
    () => {
      it(
        "should fetch all payment transactions",
        () => {
          // Arrange

          // Act
          const result =
            fetchPayments();

          // Assert
          expect(
            result
          ).toHaveLength(
            originalPayments.length
          );
        }
      );

      it(
        "should return an array of payment transactions",
        () => {
          // Arrange

          // Act
          const result =
            fetchPayments();

          // Assert
          expect(
            Array.isArray(result)
          ).toBe(true);
        }
      );

      it(
        "should return the same payment transactions stored in the mock database",
        () => {
          // Arrange

          // Act
          const result =
            fetchPayments();

          // Assert
          expect(
            result
          ).toEqual(
            paymentTransactions
          );
        }
      );

      it(
        "should return an empty array when there are no payment transactions",
        () => {
          // Arrange
          paymentTransactions.length = 0;

          // Act
          const result =
            fetchPayments();

          // Assert
          expect(
            result
          ).toEqual([]);
        }
      );
    }
  );

  describe(
    "fetchPaymentById",
    () => {
      it(
        "should fetch a payment by payment ID",
        () => {
          // Arrange
          const paymentId =
            "PAY-001";

          // Act
          const result =
            fetchPaymentById(
              paymentId
            );

          // Assert
          expect(
            result
          ).toBeDefined();

          expect(
            result.paymentId
          ).toBe(
            paymentId
          );
        }
      );

      it(
        "should return undefined for an unknown payment ID",
        () => {
          // Arrange

          // Act
          const result =
            fetchPaymentById(
              "INVALID"
            );

          // Assert
          expect(
            result
          ).toBeUndefined();
        }
      );

      it(
        "should return the correct payment properties",
        () => {
          // Arrange

          // Act
          const result =
            fetchPaymentById(
              "PAY-001"
            );

          // Assert
          expect(
            result
          ).toHaveProperty(
            "invoiceNumber"
          );

          expect(
            result
          ).toHaveProperty(
            "amountPaid"
          );

          expect(
            result
          ).toHaveProperty(
            "paymentStatus"
          );
        }
      );

      it(
        "should not modify payment transactions when fetching by ID",
        () => {
          // Arrange
          const before =
            structuredClone(
              paymentTransactions
            );

          // Act
          fetchPaymentById(
            "PAY-001"
          );

          // Assert
          expect(
            paymentTransactions
          ).toEqual(
            before
          );
        }
      );
    }
  );

  describe(
    "createPayment",
    () => {
      it(
        "should create a new payment transaction",
        () => {
          // Arrange
          const newPayment = {
            paymentId:
              "PAY-999",

            invoiceNumber:
              "INV-2026-999",

            consumerName:
              "Test Consumer",

            paymentDate:
              "2026-09-30",

            paymentMethod:
              "Cash",

            amountPaid: 1000,

            remainingBalance: 0,

            paymentStatus:
              "Paid",
          };

          // Act
          const created =
            createPayment(
              newPayment
            );

          // Assert
          expect(
            created
          ).toEqual(
            newPayment
          );

          expect(
            paymentTransactions
          ).toContainEqual(
            newPayment
          );

          expect(
            paymentTransactions
          ).toHaveLength(
            originalPayments.length +
              1
          );
        }
      );

      it(
        "should append the payment as the last record",
        () => {
          // Arrange
          const newPayment = {
            paymentId:
              "PAY-LAST",

            invoiceNumber:
              "INV-LAST",

            consumerName:
              "Last Consumer",

            paymentDate:
              "2026-10-01",

            paymentMethod:
              "GCash",

            amountPaid: 500,

            remainingBalance: 0,

            paymentStatus:
              "Paid",
          };

          // Act
          const created =
            createPayment(
              newPayment
            );

          // Assert
          expect(
            paymentTransactions.at(
              -1
            )
          ).toEqual(
            created
          );
        }
      );

      it(
        "should increase the payment transaction count by one",
        () => {
          // Arrange
          const initialLength =
            paymentTransactions.length;

          // Act
          createPayment({
            paymentId:
              "PAY-COUNT",

            invoiceNumber:
              "INV-COUNT",

            consumerName:
              "Count Test",

            paymentDate:
              "2026-10-02",

            paymentMethod:
              "Cash",

            amountPaid: 200,

            remainingBalance: 0,

            paymentStatus:
              "Paid",
          });

          // Assert
          expect(
            paymentTransactions.length
          ).toBe(
            initialLength + 1
          );
        }
      );

      it(
        "should preserve previously stored payment transactions",
        () => {
          // Arrange
          const firstPayment =
            structuredClone(
              paymentTransactions[0]
            );

          // Act
          createPayment({
            paymentId:
              "PAY-NEW",

            invoiceNumber:
              "INV-NEW",

            consumerName:
              "New Consumer",

            paymentDate:
              "2026-10-05",

            paymentMethod:
              "Cash",

            amountPaid: 750,

            remainingBalance: 0,

            paymentStatus:
              "Paid",
          });

          // Assert
          expect(
            paymentTransactions[0]
          ).toEqual(
            firstPayment
          );
        }
      );
    }
  );
});