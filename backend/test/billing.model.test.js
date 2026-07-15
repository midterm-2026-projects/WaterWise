import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import mockBillingData from "/data/mockBillingData.js";

import {
  fetchBillingRecords,
  fetchBillingRecordById,
  fetchBillingRecordByUserId,
  insertBillingRecord,
  updateBillingRecord,
  removeBillingRecord,
} from "../models/billing.model.js";

describe("Billing Model", () => {
  const originalRecords =
    structuredClone(mockBillingData);

  beforeEach(() => {
    mockBillingData.length = 0;

    mockBillingData.push(
      ...structuredClone(originalRecords)
    );
  });

  describe(
    "fetchBillingRecords",
    () => {
      it(
        "should fetch all billing records",
        () => {
          // Arrange

          // Act
          const result =
            fetchBillingRecords();

          // Assert
          expect(result).toHaveLength(
            originalRecords.length
          );
        }
      );

      it(
        "should return an array of billing records",
        () => {
          // Arrange

          // Act
          const result =
            fetchBillingRecords();

          // Assert
          expect(
            Array.isArray(result)
          ).toBe(true);
        }
      );

      it(
        "should return the same billing records stored in the mock database",
        () => {
          // Arrange

          // Act
          const result =
            fetchBillingRecords();

          // Assert
          expect(result).toEqual(
            mockBillingData
          );
        }
      );

      it(
        "should return an empty array when there are no billing records",
        () => {
          // Arrange
          mockBillingData.length = 0;

          // Act
          const result =
            fetchBillingRecords();

          // Assert
          expect(result).toEqual([]);
        }
      );
    }
  );

  describe(
    "fetchBillingRecordById",
    () => {
      it(
        "should fetch a billing record by ID",
        () => {
          // Arrange
          const id = 1;

          // Act
          const result =
            fetchBillingRecordById(id);

          // Assert
          expect(
            result
          ).toBeDefined();

          expect(result.id).toBe(id);
        }
      );

      it(
        "should return undefined when billing record does not exist",
        () => {
          // Arrange

          // Act
          const result =
            fetchBillingRecordById(
              9999
            );

          // Assert
          expect(
            result
          ).toBeUndefined();
        }
      );

      it(
        "should return the correct billing record properties",
        () => {
          // Arrange

          // Act
          const result =
            fetchBillingRecordById(1);

          // Assert
          expect(result).toHaveProperty(
            "user_id"
          );

          expect(result).toHaveProperty(
            "status"
          );

          expect(result).toHaveProperty(
            "remaining_balance"
          );
        }
      );

      it(
        "should not modify the billing records when fetching by ID",
        () => {
          // Arrange
          const before =
            structuredClone(
              mockBillingData
            );

          // Act
          fetchBillingRecordById(1);

          // Assert
          expect(
            mockBillingData
          ).toEqual(before);
        }
      );
    }
  );

  describe(
    "fetchBillingRecordByUserId",
    () => {
      it(
        "should fetch a billing record by user ID",
        () => {
          // Arrange
          const userId = 101;

          // Act
          const result =
            fetchBillingRecordByUserId(
              userId
            );

          // Assert
          expect(
            result
          ).toBeDefined();

          expect(
            result.user_id
          ).toBe(userId);
        }
      );

      it(
        "should return undefined when user ID does not exist",
        () => {
          // Arrange

          // Act
          const result =
            fetchBillingRecordByUserId(
              9999
            );

          // Assert
          expect(
            result
          ).toBeUndefined();
        }
      );

      it(
        "should return the first matching billing record",
        () => {
          // Arrange
          const userId = 101;

          // Act
          const result =
            fetchBillingRecordByUserId(
              userId
            );

          // Assert
          expect(
            result.user_id
          ).toBe(userId);
        }
      );

      it(
        "should not modify billing records when fetching by user ID",
        () => {
          // Arrange
          const before =
            structuredClone(
              mockBillingData
            );

          // Act
          fetchBillingRecordByUserId(
            101
          );

          // Assert
          expect(
            mockBillingData
          ).toEqual(before);
        }
      );
    }
  );

    describe(
    "insertBillingRecord",
    () => {
      it(
        "should insert a billing record",
        () => {
          // Arrange
          const newRecord = {
            user_id: 999,
            name:
              "Test Consumer",

            previous_reading: 100,
            present_reading: 120,

            cubic_used: 20,
            cubic_used_last_month: 18,

            current_bill: 300,
            total_bill: 300,

            payment_1: 0,
            payment_2: 0,
            payment_total: 0,

            remaining_balance: 300,

            billing_date:
              "2025-05-01",

            due_date:
              "2025-05-15",

            status: "Unpaid",

            created_at:
              "2025-05-01T08:00:00Z",

            payment_1_date: null,
            payment_2_date: null,

            reference_code:
              "REF-TEST-001",
          };

          // Act
          const result =
            insertBillingRecord(
              newRecord
            );

          // Assert
          expect(
            result.id
          ).toBeDefined();

          expect(
            result.user_id
          ).toBe(999);

          expect(
            result.name
          ).toBe(
            "Test Consumer"
          );

          expect(
            mockBillingData
          ).toContainEqual(
            result
          );

          expect(
            mockBillingData
          ).toHaveLength(
            originalRecords.length +
              1
          );
        }
      );

      it(
        "should assign a unique ID to a new billing record",
        () => {
          // Arrange
          const newRecord = {
            user_id: 500,
            name:
              "Another Consumer",
          };

          // Act
          const result =
            insertBillingRecord(
              newRecord
            );

          // Assert
          expect(
            result.id
          ).toBeDefined();

          expect(
            typeof result.id
          ).toBe("number");
        }
      );

      it(
        "should store the inserted billing record as the last record",
        () => {
          // Arrange
          const newRecord = {
            user_id: 888,
            name:
              "Last Consumer",
          };

          // Act
          const result =
            insertBillingRecord(
              newRecord
            );

          // Assert
          expect(
            mockBillingData.at(-1)
          ).toEqual(result);
        }
      );

      it(
        "should increase the billing record count by one",
        () => {
          // Arrange
          const initialLength =
            mockBillingData.length;

          // Act
          insertBillingRecord({
            user_id: 777,
            name:
              "Count Test",
          });

          // Assert
          expect(
            mockBillingData.length
          ).toBe(
            initialLength + 1
          );
        }
      );
    }
  );

  describe(
    "updateBillingRecord",
    () => {
      it(
        "should update a billing record",
        () => {
          // Arrange
          const id = 1;

          // Act
          const result =
            updateBillingRecord(
              id,
              {
                status: "Paid",
                remaining_balance: 0,
              }
            );

          // Assert
          expect(
            result
          ).not.toBeNull();

          expect(
            result.status
          ).toBe("Paid");

          expect(
            result.remaining_balance
          ).toBe(0);
        }
      );

      it(
        "should update multiple billing record fields",
        () => {
          // Arrange
          const id = 1;

          // Act
          const result =
            updateBillingRecord(
              id,
              {
                payment_total: 300,
                remaining_balance: 0,
                status: "Paid",
              }
            );

          // Assert
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
        "should preserve unchanged fields",
        () => {
          // Arrange
          const before =
            fetchBillingRecordById(
              1
            );

          // Act
          const result =
            updateBillingRecord(
              1,
              {
                status: "Paid",
              }
            );

          // Assert
          expect(
            result.user_id
          ).toBe(
            before.user_id
          );

          expect(
            result.name
          ).toBe(
            before.name
          );
        }
      );

      it(
        "should update only the specified fields",
        () => {
          // Arrange

          // Act
          const result =
            updateBillingRecord(
              1,
              {
                status: "Paid",
              }
            );

          // Assert
          expect(
            result.status
          ).toBe("Paid");
        }
      );

      it(
        "should return null when updating a non-existing billing record",
        () => {
          // Arrange

          // Act
          const result =
            updateBillingRecord(
              9999,
              {
                status: "Paid",
              }
            );

          // Assert
          expect(
            result
          ).toBeNull();
        }
      );
    }
  );

  describe(
    "removeBillingRecord",
    () => {
      it(
        "should remove a billing record",
        () => {
          // Arrange
          const id = 1;

          // Act
          const deleted =
            removeBillingRecord(
              id
            );

          // Assert
          expect(
            deleted
          ).toBe(true);

          expect(
            fetchBillingRecordById(
              id
            )
          ).toBeUndefined();

          expect(
            mockBillingData
          ).toHaveLength(
            originalRecords.length -
              1
          );
        }
      );

      it(
        "should reduce the billing record count after deletion",
        () => {
          // Arrange
          const initialLength =
            mockBillingData.length;

          // Act
          removeBillingRecord(
            1
          );

          // Assert
          expect(
            mockBillingData.length
          ).toBe(
            initialLength - 1
          );
        }
      );

      it(
        "should no longer find the deleted billing record",
        () => {
          // Arrange
          removeBillingRecord(
            1
          );

          // Act
          const result =
            fetchBillingRecordById(
              1
            );

          // Assert
          expect(
            result
          ).toBeUndefined();
        }
      );

      it(
        "should not affect the remaining billing records",
        () => {
          // Arrange
          const secondRecord =
            fetchBillingRecordById(
              2
            );

          // Act
          removeBillingRecord(
            1
          );

          // Assert
          expect(
            fetchBillingRecordById(
              2
            )
          ).toEqual(
            secondRecord
          );
        }
      );

      it(
        "should return false when removing a non-existing billing record",
        () => {
          // Arrange

          // Act
          const deleted =
            removeBillingRecord(
              9999
            );

          // Assert
          expect(
            deleted
          ).toBe(false);
        }
      );
    }
  );
});