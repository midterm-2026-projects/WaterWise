export function validateMeterReading(data) {
  const errors = {};

  if (
    !data.consumerNo ||
    data.consumerNo.toString().trim() === ""
  ) {
    errors.consumerNo =
      "Consumer number is required.";
  }

  if (
    !data.consumerName ||
    data.consumerName.toString().trim() === ""
  ) {
    errors.consumerName =
      "Consumer name is required.";
  }

  if (
    !data.purok ||
    data.purok.toString().trim() === ""
  ) {
    errors.purok =
      "Purok is required.";
  }

  if (
    data.previousReading === undefined ||
    data.previousReading === null ||
    data.previousReading === ""
  ) {
    errors.previousReading =
      "Previous reading is required.";
  }

  if (
    data.currentReading === undefined ||
    data.currentReading === null ||
    data.currentReading === ""
  ) {
    errors.currentReading =
      "Current reading is required.";
  }

  if (
    data.readingDate === undefined ||
    data.readingDate === null ||
    data.readingDate === ""
  ) {
    errors.readingDate =
      "Reading date is required.";
  }

  if (
    data.previousReading !== undefined &&
    data.previousReading !== "" &&
    isNaN(Number(data.previousReading))
  ) {
    errors.previousReading =
      "Previous reading must be a number.";
  }

  if (
    data.currentReading !== undefined &&
    data.currentReading !== "" &&
    isNaN(Number(data.currentReading))
  ) {
    errors.currentReading =
      "Current reading must be a number.";
  }

  if (
    !errors.previousReading &&
    !errors.currentReading
  ) {
    if (
      Number(data.previousReading) >
      Number(data.currentReading)
    ) {
      errors.currentReading =
        "Current reading must be greater than or equal to previous reading.";
    }
  }

  return {
    isValid:
      Object.keys(errors).length === 0,
    errors,
  };
}

export default validateMeterReading;