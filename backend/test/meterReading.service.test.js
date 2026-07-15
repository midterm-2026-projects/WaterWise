import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
} from "vitest";

import {
  fetchMeterReadings,
  fetchMeterReadingById,
  addMeterReading,
  editMeterReading,
  removeMeterReading,
} from "../services/meterReading.service.js";

import {
  getMeterReadings,
  getMeterReadingById,
  createMeterReading,
  updateMeterReading,
  deleteMeterReading,
} from "../models/meterReading.model.js";

import validateMeterReading from "../validation/meterReading.validation.js";

vi.mock(
  "../models/meterReading.model.js",
  () => ({
    getMeterReadings: vi.fn(),
    getMeterReadingById: vi.fn(),
    createMeterReading: vi.fn(),
    updateMeterReading: vi.fn(),
    deleteMeterReading: vi.fn(),
  })
);

vi.mock(
  "../validation/meterReading.validation.js",
  () => ({
    default: vi.fn(),
  })
);

describe(
  "Meter Reading Service",
  () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    describe(
      "fetchMeterReadings",
      () => {
        it(
          "should return all meter readings",
          () => {
            // Arrange

            const readings = [
              {
                id: 1,
                consumerName:
                  "Juan",
              },
            ];

            getMeterReadings.mockReturnValue(
              readings
            );

            // Act

            const result =
              fetchMeterReadings();

            // Assert

            expect(
              getMeterReadings
            ).toHaveBeenCalled();

            expect(result).toEqual(
              readings
            );
          }
        );
      }
    );

    describe(
      "fetchMeterReadingById",
      () => {
        it(
          "should return one meter reading",
          () => {
            // Arrange

            const reading = {
              id: 1,
              consumerName:
                "Juan",
            };

            getMeterReadingById.mockReturnValue(
              reading
            );

            // Act

            const result =
              fetchMeterReadingById(
                1
              );

            // Assert

            expect(
              result
            ).toEqual(reading);
          }
        );

        it(
          "should throw if reading does not exist",
          () => {
            // Arrange

            getMeterReadingById.mockReturnValue(
              null
            );

            // Act / Assert

            expect(() =>
              fetchMeterReadingById(
                99
              )
            ).toThrow(
              "Meter reading not found."
            );
          }
        );
      }
    );

    describe(
      "addMeterReading",
      () => {
        it(
          "should create a meter reading",
          () => {
            // Arrange

            const payload = {
              consumerNo:
                "C-1001",
              consumerName:
                "Juan",
              purok:
                "Purok 1",
              previousReading: 100,
              currentReading: 120,
              readingDate:
                "2026-07-01",
            };

            validateMeterReading.mockReturnValue(
              {
                isValid: true,
                errors: {},
              }
            );

            createMeterReading.mockReturnValue(
              {
                id: 1,
                ...payload,
                consumption: 20,
                status:
                  "Recorded",
              }
            );

            // Act

            const result =
              addMeterReading(
                payload
              );

            // Assert

            expect(
              validateMeterReading
            ).toHaveBeenCalledWith(
              payload
            );

            expect(
              createMeterReading
            ).toHaveBeenCalled();

            expect(
              result.consumption
            ).toBe(20);
          }
        );

        it(
          "should throw validation errors",
          () => {
            // Arrange

            validateMeterReading.mockReturnValue(
              {
                isValid: false,
                errors: {
                  consumerNo:
                    "Required",
                },
              }
            );

            // Act / Assert

            expect(() =>
              addMeterReading(
                {}
              )
            ).toThrow();
          }
        );
      }
    );

    describe(
      "editMeterReading",
      () => {
        it(
          "should update a meter reading",
          () => {
            // Arrange

            const payload = {
              consumerNo:
                "C-1001",
              consumerName:
                "Updated",
              purok:
                "Purok 1",
              previousReading: 100,
              currentReading: 130,
              readingDate:
                "2026-07-01",
            };

            getMeterReadingById.mockReturnValue(
              {
                id: 1,
              }
            );

            validateMeterReading.mockReturnValue(
              {
                isValid: true,
                errors: {},
              }
            );

            updateMeterReading.mockReturnValue(
              {
                id: 1,
                ...payload,
                consumption: 30,
              }
            );

            // Act

            const result =
              editMeterReading(
                1,
                payload
              );

            // Assert

            expect(
              updateMeterReading
            ).toHaveBeenCalled();

            expect(
              result.consumerName
            ).toBe(
              "Updated"
            );

            expect(
              result.consumption
            ).toBe(30);
          }
        );

        it(
          "should throw if record does not exist",
          () => {
            // Arrange

            getMeterReadingById.mockReturnValue(
              null
            );

            // Act / Assert

            expect(() =>
              editMeterReading(
                1,
                {}
              )
            ).toThrow(
              "Meter reading not found."
            );
          }
        );
      }
    );

    describe(
      "removeMeterReading",
      () => {
        it(
          "should delete a meter reading",
          () => {
            // Arrange

            getMeterReadingById.mockReturnValue(
              {
                id: 1,
              }
            );

            deleteMeterReading.mockReturnValue(
              true
            );

            // Act

            const result =
              removeMeterReading(
                1
              );

            // Assert

            expect(
              deleteMeterReading
            ).toHaveBeenCalledWith(
              1
            );

            expect(
              result
            ).toEqual({
              message:
                "Meter reading deleted successfully.",
            });
          }
        );

        it(
          "should throw if record does not exist",
          () => {
            // Arrange

            getMeterReadingById.mockReturnValue(
              null
            );

            // Act / Assert

            expect(() =>
              removeMeterReading(
                1
              )
            ).toThrow(
              "Meter reading not found."
            );
          }
        );
      }
    );
  }
);