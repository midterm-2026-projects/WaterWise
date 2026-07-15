import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  calculateBillingAmount,
  generateBillingRecord,
  processPayment,
  fetchAllBilling,
  fetchBilling,
} from "../services/billing.service.js";

import * as billingModel from "../models/billing.model.js";

vi.mock("../models/billing.model.js", () => ({
  fetchBillingRecords: vi.fn(),
  fetchBillingRecordById: vi.fn(),
  insertBillingRecord: vi.fn(),
  updateBillingRecord: vi.fn(),
}));

describe("Billing Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe(
    "calculateBillingAmount",
    () => {
      it(
        "should calculate billing amount correctly",
        () => {
          // Arrange
          const previousReading = 100;
          const presentReading = 120;

          // Act
          const result =
            calculateBillingAmount(
              previousReading,
              presentReading
            );

          // Assert
          expect(result).toEqual({
            cubic_used: 20,
            current_bill: 300,
            total_bill: 300,
          });
        }
      );

      it(
        "should calculate zero consumption",
        () => {
          // Arrange

          // Act
          const result =
            calculateBillingAmount(
              100,
              100
            );

          // Assert
          expect(
            result.cubic_used
          ).toBe(0);

          expect(
            result.current_bill
          ).toBe(0);

          expect(
            result.total_bill
          ).toBe(0);
        }
      );

      it(
        "should calculate billing amount for large consumption",
        () => {
          // Arrange

          // Act
          const result =
            calculateBillingAmount(
              100,
              300
            );

          // Assert
          expect(
            result.cubic_used
          ).toBe(200);

          expect(
            result.current_bill
          ).toBeGreaterThan(0);

          expect(
            result.total_bill
          ).toBeGreaterThan(0);
        }
      );

      it(
        "should return numeric billing values",
        () => {
          // Arrange

          // Act
          const result =
            calculateBillingAmount(
              100,
              120
            );

          // Assert
          expect(
            typeof result.current_bill
          ).toBe("number");

          expect(
            typeof result.total_bill
          ).toBe("number");

          expect(
            typeof result.cubic_used
          ).toBe("number");
        }
      );
    }
  );

  describe(
    "generateBillingRecord",
    () => {
      it(
        "should generate a billing record",
        () => {
          // Arrange
          billingModel.insertBillingRecord.mockImplementation(
            (record) => record
          );

          const billing = {
            id: 10,
            user_id: 200,
            name:
              "Juan Dela Cruz",
            previous_reading: 100,
            present_reading: 120,
            billing_date:
              "2025-06-01",
            due_date:
              "2025-06-15",
          };

          // Act
          const result =
            generateBillingRecord(
              billing
            );

          // Assert
          expect(
            billingModel.insertBillingRecord
          ).toHaveBeenCalledTimes(
            1
          );

          expect(
            result.id
          ).toBe(10);

          expect(
            result.name
          ).toBe(
            "Juan Dela Cruz"
          );

          expect(
            result.cubic_used
          ).toBe(20);

          expect(
            result.current_bill
          ).toBe(300);

          expect(
            result.total_bill
          ).toBe(300);

          expect(
            result.remaining_balance
          ).toBe(300);

          expect(
            result.status
          ).toBe("Unpaid");
        }
      );

      it(
        "should calculate cubic usage before inserting",
        () => {
          // Arrange
          billingModel.insertBillingRecord.mockImplementation(
            (record) => record
          );

          // Act
          const result =
            generateBillingRecord({
              previous_reading: 50,
              present_reading: 70,
            });

          // Assert
          expect(
            result.cubic_used
          ).toBe(20);
        }
      );

      it(
        "should initialize payment fields",
        () => {
          // Arrange
          billingModel.insertBillingRecord.mockImplementation(
            (record) => record
          );

          // Act
          const result =
            generateBillingRecord({
              previous_reading: 10,
              present_reading: 20,
            });

          // Assert
          expect(
            result.payment_1
          ).toBe(0);

          expect(
            result.payment_2
          ).toBe(0);

          expect(
            result.payment_total
          ).toBe(0);

          expect(
            result.remaining_balance
          ).toBe(
            result.total_bill
          );
        }
      );

      it(
        "should call insertBillingRecord once",
        () => {
          // Arrange
          billingModel.insertBillingRecord.mockImplementation(
            (record) => record
          );

          // Act
          generateBillingRecord({
            previous_reading: 1,
            present_reading: 2,
          });

          // Assert
          expect(
            billingModel.insertBillingRecord
          ).toHaveBeenCalledOnce();
        }
      );
    }
  );

  describe(
    "processPayment",
    () => {
      it(
        "should process a full payment",
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
            processPayment(
              1,
              300
            );

          // Assert
          expect(
            result.status
          ).toBe("Paid");

          expect(
            result.remaining_balance
          ).toBe(0);

          expect(
            result.payment_total
          ).toBe(300);
        }
      );

      it(
        "should process a partial payment",
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
            processPayment(
              1,
              100
            );

          // Assert
          expect(
            result.status
          ).toBe(
            "Partially Paid"
          );

          expect(
            result.remaining_balance
          ).toBe(200);

          expect(
            result.payment_total
          ).toBe(100);
        }
      );

      it(
        "should call updateBillingRecord when payment is processed",
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
          processPayment(
            1,
            100
          );

          // Assert
          expect(
            billingModel.updateBillingRecord
          ).toHaveBeenCalledOnce();
        }
      );

            it(
        "should update payment_1 on the first payment",
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
            (_, updated) => updated
          );

          // Act
          const result =
            processPayment(
              1,
              50
            );

          // Assert
          expect(
            result.payment_1
          ).toBe(50);

          expect(
            result.payment_2
          ).toBe(0);
        }
      );

      it(
        "should update payment_2 on the second payment",
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
            (_, updated) => updated
          );

          // Act
          const result =
            processPayment(
              1,
              50
            );

          // Assert
          expect(
            result.payment_2
          ).toBe(50);

          expect(
            result.payment_total
          ).toBe(150);

          expect(
            result.remaining_balance
          ).toBe(150);
        }
      );

      it(
        "should keep remaining balance after partial payment",
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
            (_, updated) => updated
          );

          // Act
          const result =
            processPayment(
              1,
              250
            );

          // Assert
          expect(
            result.remaining_balance
          ).toBe(250);

          expect(
            result.status
          ).toBe(
            "Partially Paid"
          );
        }
      );

      it(
        "should throw an error when billing record does not exist",
        () => {
          // Arrange
          billingModel.fetchBillingRecordById.mockReturnValue(
            null
          );

          // Act & Assert
          expect(() =>
            processPayment(
              999,
              100
            )
          ).toThrow(
            "Billing record not found."
          );
        }
      );

      it(
        "should prevent overpayment",
        () => {
          // Arrange
          billingModel.fetchBillingRecordById.mockReturnValue(
            {
              id: 1,
              remaining_balance: 200,
            }
          );

          // Act & Assert
          expect(() =>
            processPayment(
              1,
              300
            )
          ).toThrow(
            "Payment exceeds remaining balance."
          );
        }
      );
    }
  );

  describe(
    "fetchAllBilling",
    () => {
      it(
        "should fetch all billing records",
        () => {
          // Arrange
          billingModel.fetchBillingRecords.mockReturnValue(
            [
              {
                id: 1,
              },
              {
                id: 2,
              },
            ]
          );

          // Act
          const result =
            fetchAllBilling();

          // Assert
          expect(
            billingModel.fetchBillingRecords
          ).toHaveBeenCalledTimes(
            1
          );

          expect(
            result
          ).toHaveLength(2);
        }
      );

      it(
        "should return an empty array when no billing records exist",
        () => {
          // Arrange
          billingModel.fetchBillingRecords.mockReturnValue(
            []
          );

          // Act
          const result =
            fetchAllBilling();

          // Assert
          expect(
            result
          ).toEqual([]);
        }
      );

      it(
        "should call fetchBillingRecords once",
        () => {
          // Arrange
          billingModel.fetchBillingRecords.mockReturnValue(
            []
          );

          // Act
          fetchAllBilling();

          // Assert
          expect(
            billingModel.fetchBillingRecords
          ).toHaveBeenCalledOnce();
        }
      );
    }
  );

  describe(
    "fetchBilling",
    () => {
      it(
        "should fetch one billing record",
        () => {
          // Arrange
          billingModel.fetchBillingRecordById.mockReturnValue(
            {
              id: 1,
            }
          );

          // Act
          const result =
            fetchBilling(
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
            fetchBilling(
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
          fetchBilling(
            1
          );

          // Assert
          expect(
            billingModel.fetchBillingRecordById
          ).toHaveBeenCalledOnce();
        }
      );
    }
  );
});