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

  it("should fetch all billing records", () => {
    // Arrange

    // Act
    const result =
      fetchBillingRecords();

    // Assert
    expect(result).toHaveLength(
      originalRecords.length
    );
  });

  it("should fetch a billing record by ID", () => {
    // Arrange
    const id = 1;

    // Act
    const result =
      fetchBillingRecordById(id);

    // Assert
    expect(result).toBeDefined();
    expect(result.id).toBe(id);
  });

  it("should fetch a billing record by user ID", () => {
    // Arrange
    const userId = 101;

    // Act
    const result =
      fetchBillingRecordByUserId(
        userId
      );

    // Assert
    expect(result).toBeDefined();
    expect(result.user_id).toBe(
      userId
    );
  });

  it("should insert a billing record", () => {
    // Arrange
    const newRecord = {
      user_id: 999,
      name: "Test Consumer",

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

      billing_date: "2025-05-01",
      due_date: "2025-05-15",

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
    expect(result.id).toBeDefined();

    expect(result.user_id).toBe(
      999
    );

    expect(result.name).toBe(
      "Test Consumer"
    );

    expect(
      mockBillingData
    ).toContainEqual(result);

    expect(
      mockBillingData
    ).toHaveLength(
      originalRecords.length + 1
    );
  });

  it("should update a billing record", () => {
    // Arrange
    const id = 1;

    // Act
    const result =
      updateBillingRecord(id, {
        status: "Paid",
        remaining_balance: 0,
      });

    // Assert
    expect(result).not.toBeNull();

    expect(result.status).toBe(
      "Paid"
    );

    expect(
      result.remaining_balance
    ).toBe(0);
  });

  it("should return null when updating a non-existing billing record", () => {
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
    expect(result).toBeNull();
  });

  it("should remove a billing record", () => {
    // Arrange
    const id = 1;

    // Act
    const deleted =
      removeBillingRecord(id);

    // Assert
    expect(deleted).toBe(true);

    expect(
      fetchBillingRecordById(id)
    ).toBeUndefined();

    expect(
      mockBillingData
    ).toHaveLength(
      originalRecords.length - 1
    );
  });

  it("should return false when removing a non-existing billing record", () => {
    // Arrange

    // Act
    const deleted =
      removeBillingRecord(9999);

    // Assert
    expect(deleted).toBe(false);
  });
});