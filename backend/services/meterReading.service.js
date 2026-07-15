import {
  getMeterReadings,
  getMeterReadingById,
  createMeterReading,
  updateMeterReading,
  deleteMeterReading,
} from "../models/meterReading.model.js";

import validateMeterReading from "../validation/meterReading.validation.js";

export function fetchMeterReadings() {
  return getMeterReadings();
}

export function fetchMeterReadingById(id) {
  const reading = getMeterReadingById(id);

  if (!reading) {
    throw new Error("Meter reading not found.");
  }

  return reading;
}

export function addMeterReading(data) {
  const validation =
    validateMeterReading(data);

  if (!validation.isValid) {
    throw {
      status: 400,
      errors: validation.errors,
    };
  }

  const newReading = {
    consumerNo: data.consumerNo,
    consumerName: data.consumerName,
    purok: data.purok,
    previousReading: Number(
      data.previousReading
    ),
    currentReading: Number(
      data.currentReading
    ),
    consumption:
      Number(data.currentReading) -
      Number(data.previousReading),
    readingDate: data.readingDate,
    status:
      data.status || "Recorded",
  };

  return createMeterReading(
    newReading
  );
}

export function editMeterReading(
  id,
  data
) {
  const existing =
    getMeterReadingById(id);

  if (!existing) {
    throw new Error(
      "Meter reading not found."
    );
  }

  const validation =
    validateMeterReading(data);

  if (!validation.isValid) {
    throw {
      status: 400,
      errors: validation.errors,
    };
  }

  const updatedReading = {
    consumerNo: data.consumerNo,
    consumerName: data.consumerName,
    purok: data.purok,
    previousReading: Number(
      data.previousReading
    ),
    currentReading: Number(
      data.currentReading
    ),
    consumption:
      Number(data.currentReading) -
      Number(data.previousReading),
    readingDate: data.readingDate,
    status:
      data.status || "Recorded",
  };

  return updateMeterReading(
    id,
    updatedReading
  );
}

export function removeMeterReading(id) {
  const existing =
    getMeterReadingById(id);

  if (!existing) {
    throw new Error(
      "Meter reading not found."
    );
  }

  deleteMeterReading(id);

  return {
    message:
      "Meter reading deleted successfully.",
  };
}