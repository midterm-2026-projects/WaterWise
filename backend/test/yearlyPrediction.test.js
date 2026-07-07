import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../models/yearlyPrediction.model.js", () => ({
  getYearlyBillingData: vi.fn(),
}));

import * as yearlyPredictionModel from "../models/yearlyPrediction.model.js";
import { generateYearlyPrediction } from "../services/yearlyPrediction.service.js";

describe("Yearly Prediction Service", () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should generate the yearly prediction from five years of billing records", () => {

    // Arrange
    const billingData = [
      { billing_date: "2021-01-15", cubic_used: 200 },
      { billing_date: "2021-02-15", cubic_used: 180 },

      { billing_date: "2022-01-15", cubic_used: 220 },
      { billing_date: "2022-02-15", cubic_used: 210 },

      { billing_date: "2023-01-15", cubic_used: 250 },
      { billing_date: "2023-02-15", cubic_used: 230 },

      { billing_date: "2024-01-15", cubic_used: 270 },
      { billing_date: "2024-02-15", cubic_used: 260 },

      { billing_date: "2025-01-15", cubic_used: 300 },
      { billing_date: "2025-02-15", cubic_used: 290 },
    ];

    const expectedPrediction = {
      year: 2026,
      consumption: 482,
      predicted: true,
    };

    yearlyPredictionModel.getYearlyBillingData.mockReturnValue(
      billingData
    );

    // Act
    const result = generateYearlyPrediction();

    // Assert
    expect(
      yearlyPredictionModel.getYearlyBillingData
    ).toHaveBeenCalledOnce();

    expect(result.at(-1)).toEqual(expectedPrediction);

  });

  it("should return an empty array when there is no billing data", () => {

    // Arrange
    yearlyPredictionModel.getYearlyBillingData.mockReturnValue([]);

    // Act
    const result = generateYearlyPrediction();

    // Assert
    expect(
      yearlyPredictionModel.getYearlyBillingData
    ).toHaveBeenCalledOnce();

    expect(result).toEqual([]);

  });

  it("should return only one predicted year", () => {

    // Arrange
    const billingData = [
      { billing_date: "2021-01-15", cubic_used: 200 },
      { billing_date: "2022-01-15", cubic_used: 220 },
      { billing_date: "2023-01-15", cubic_used: 250 },
      { billing_date: "2024-01-15", cubic_used: 270 },
      { billing_date: "2025-01-15", cubic_used: 300 },
    ];

    yearlyPredictionModel.getYearlyBillingData.mockReturnValue(
      billingData
    );

    // Act
    const result = generateYearlyPrediction();

    // Assert
    expect(
      yearlyPredictionModel.getYearlyBillingData
    ).toHaveBeenCalledOnce();

    expect(
      result.filter((item) => item.predicted)
    ).toHaveLength(1);

  });

  it("should append the predicted year as the last record", () => {

    // Arrange
    const billingData = [
      { billing_date: "2021-01-15", cubic_used: 200 },
      { billing_date: "2022-01-15", cubic_used: 220 },
      { billing_date: "2023-01-15", cubic_used: 250 },
      { billing_date: "2024-01-15", cubic_used: 270 },
      { billing_date: "2025-01-15", cubic_used: 300 },
    ];

    yearlyPredictionModel.getYearlyBillingData.mockReturnValue(
      billingData
    );

    // Act
    const result = generateYearlyPrediction();

    // Assert
    expect(
      yearlyPredictionModel.getYearlyBillingData
    ).toHaveBeenCalledOnce();

    expect(result.at(-1)).toEqual({
      year: 2026,
      consumption: 248,
      predicted: true,
    });

  });

});