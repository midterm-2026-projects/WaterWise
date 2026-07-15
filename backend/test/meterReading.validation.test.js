import {
  describe,
  it,
  expect,
} from "vitest";

import validateMeterReading from "../validation/meterReading.validation.js";

describe(
  "Meter Reading Validation",
  () => {
    it(
      "should validate a valid meter reading",
      () => {
        // Arrange

        const data = {
          consumerNo: "C-1001",
          consumerName:
            "Juan Dela Cruz",
          purok: "Purok 1",
          previousReading: 100,
          currentReading: 120,
          readingDate:
            "2026-07-01",
        };

        // Act

        const result =
          validateMeterReading(
            data
          );

        // Assert

        expect(
          result.isValid
        ).toBe(true);

        expect(
          result.errors
        ).toEqual({});
      }
    );

    it(
      "should require consumer number",
      () => {
        // Arrange

        const data = {
          consumerNo: "",
          consumerName:
            "Juan Dela Cruz",
          purok: "Purok 1",
          previousReading: 100,
          currentReading: 120,
          readingDate:
            "2026-07-01",
        };

        // Act

        const result =
          validateMeterReading(
            data
          );

        // Assert

        expect(
          result.isValid
        ).toBe(false);

        expect(
          result.errors
            .consumerNo
        ).toBe(
          "Consumer number is required."
        );
      }
    );

    it(
      "should require consumer name",
      () => {
        // Arrange

        const data = {
          consumerNo: "C-1001",
          consumerName: "",
          purok: "Purok 1",
          previousReading: 100,
          currentReading: 120,
          readingDate:
            "2026-07-01",
        };

        // Act

        const result =
          validateMeterReading(
            data
          );

        // Assert

        expect(
          result.isValid
        ).toBe(false);

        expect(
          result.errors
            .consumerName
        ).toBe(
          "Consumer name is required."
        );
      }
    );

    it(
      "should require purok",
      () => {
        // Arrange

        const data = {
          consumerNo: "C-1001",
          consumerName:
            "Juan Dela Cruz",
          purok: "",
          previousReading: 100,
          currentReading: 120,
          readingDate:
            "2026-07-01",
        };

        // Act

        const result =
          validateMeterReading(
            data
          );

        // Assert

        expect(
          result.isValid
        ).toBe(false);

        expect(
          result.errors.purok
        ).toBe(
          "Purok is required."
        );
      }
    );

    it(
      "should require previous reading",
      () => {
        // Arrange

        const data = {
          consumerNo: "C-1001",
          consumerName:
            "Juan Dela Cruz",
          purok: "Purok 1",
          currentReading: 120,
          readingDate:
            "2026-07-01",
        };

        // Act

        const result =
          validateMeterReading(
            data
          );

        // Assert

        expect(
          result.isValid
        ).toBe(false);

        expect(
          result.errors
            .previousReading
        ).toBe(
          "Previous reading is required."
        );
      }
    );

    it(
      "should require current reading",
      () => {
        // Arrange

        const data = {
          consumerNo: "C-1001",
          consumerName:
            "Juan Dela Cruz",
          purok: "Purok 1",
          previousReading: 100,
          readingDate:
            "2026-07-01",
        };

        // Act

        const result =
          validateMeterReading(
            data
          );

        // Assert

        expect(
          result.isValid
        ).toBe(false);

        expect(
          result.errors
            .currentReading
        ).toBe(
          "Current reading is required."
        );
      }
    );

    it(
      "should require reading date",
      () => {
        // Arrange

        const data = {
          consumerNo: "C-1001",
          consumerName:
            "Juan Dela Cruz",
          purok: "Purok 1",
          previousReading: 100,
          currentReading: 120,
        };

        // Act

        const result =
          validateMeterReading(
            data
          );

        // Assert

        expect(
          result.isValid
        ).toBe(false);

        expect(
          result.errors
            .readingDate
        ).toBe(
          "Reading date is required."
        );
      }
    );

    it(
      "should require current reading to be greater than previous reading",
      () => {
        // Arrange

        const data = {
          consumerNo: "C-1001",
          consumerName:
            "Juan Dela Cruz",
          purok: "Purok 1",
          previousReading: 200,
          currentReading: 150,
          readingDate:
            "2026-07-01",
        };

        // Act

        const result =
          validateMeterReading(
            data
          );

        // Assert

        expect(
          result.isValid
        ).toBe(false);

        expect(
          result.errors
            .currentReading
        ).toBe(
          "Current reading must be greater than or equal to previous reading."
        );
      }
    );

    it.each([
      ["abc", 120],
      [100, "xyz"],
      ["abc", "xyz"],
    ])(
      "should reject non-numeric readings (%s, %s)",
      (
        previousReading,
        currentReading
      ) => {
        // Arrange

        const data = {
          consumerNo: "C-1001",
          consumerName:
            "Juan Dela Cruz",
          purok: "Purok 1",
          previousReading,
          currentReading,
          readingDate:
            "2026-07-01",
        };

        // Act

        const result =
          validateMeterReading(
            data
          );

        // Assert

        expect(
          result.isValid
        ).toBe(false);
      }
    );
  }
);