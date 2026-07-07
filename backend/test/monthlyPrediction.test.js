import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../models/monthlyPrediction.model.js", () => ({
  getMonthlyBillingData: vi.fn(),
}));

import * as monthlyPredictionModel from "../models/monthlyPrediction.model.js";
import { generateMonthlyPrediction } from "../services/monthlyPrediction.service.js";

describe("Monthly Prediction Service", () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should generate the monthly prediction from five months of billing records", () => {

    // Arrange
    const billingData = [
      { billing_date: "2025-01-15", cubic_used: 18 },
      { billing_date: "2025-01-18", cubic_used: 22 }, // Jan = 40

      { billing_date: "2025-02-10", cubic_used: 25 },
      { billing_date: "2025-02-18", cubic_used: 20 }, // Feb = 45

      { billing_date: "2025-03-12", cubic_used: 30 }, // Mar = 30

      { billing_date: "2025-04-08", cubic_used: 28 }, // Apr = 28

      { billing_date: "2025-05-10", cubic_used: 32 }, // May = 32
    ];

    const expectedPrediction = {
      month: "2025-06",
      consumption: 35,
      predicted: true,
    };

    monthlyPredictionModel.getMonthlyBillingData.mockReturnValue(
      billingData
    );

    // Act
    const result = generateMonthlyPrediction();

    // Assert
    expect(
      monthlyPredictionModel.getMonthlyBillingData
    ).toHaveBeenCalledOnce();

    expect(result.at(-1)).toEqual(expectedPrediction);

  });

  it("should return an empty array when there is no billing data", () => {

    // Arrange
    monthlyPredictionModel.getMonthlyBillingData.mockReturnValue([]);

    // Act
    const result = generateMonthlyPrediction();

    // Assert
    expect(
      monthlyPredictionModel.getMonthlyBillingData
    ).toHaveBeenCalledOnce();

    expect(result).toEqual([]);

  });

  it("should return only one predicted month", () => {

    // Arrange
    const billingData = [
      { billing_date: "2025-01-15", cubic_used: 18 },
      { billing_date: "2025-01-18", cubic_used: 22 },

      { billing_date: "2025-02-10", cubic_used: 25 },
      { billing_date: "2025-02-18", cubic_used: 20 },

      { billing_date: "2025-03-12", cubic_used: 30 },

      { billing_date: "2025-04-08", cubic_used: 28 },

      { billing_date: "2025-05-10", cubic_used: 32 },
    ];

    monthlyPredictionModel.getMonthlyBillingData.mockReturnValue(
      billingData
    );

    // Act
    const result = generateMonthlyPrediction();

    // Assert
    expect(
      monthlyPredictionModel.getMonthlyBillingData
    ).toHaveBeenCalledOnce();

    expect(
      result.filter((item) => item.predicted)
    ).toHaveLength(1);

  });

  it("should append the predicted month as the last record", () => {

    // Arrange
    const billingData = [
      { billing_date: "2025-01-15", cubic_used: 18 },
      { billing_date: "2025-01-18", cubic_used: 22 },

      { billing_date: "2025-02-10", cubic_used: 25 },
      { billing_date: "2025-02-18", cubic_used: 20 },

      { billing_date: "2025-03-12", cubic_used: 30 },

      { billing_date: "2025-04-08", cubic_used: 28 },

      { billing_date: "2025-05-10", cubic_used: 32 },
    ];

    monthlyPredictionModel.getMonthlyBillingData.mockReturnValue(
      billingData
    );

    // Act
    const result = generateMonthlyPrediction();

    // Assert
    expect(
      monthlyPredictionModel.getMonthlyBillingData
    ).toHaveBeenCalledOnce();

    expect(result.at(-1)).toEqual({
      month: "2025-06",
      consumption: 35,
      predicted: true,
    });

  });

});