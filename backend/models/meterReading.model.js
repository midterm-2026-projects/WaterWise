import mockMeterReadingData from "../data/mockMeterReadingData.js";

export function getMeterReadings() {
  return [...mockMeterReadingData];
}

export function getMeterReadingById(id) {
  return (
    mockMeterReadingData.find(
      (reading) => reading.id === Number(id)
    ) || null
  );
}

export function createMeterReading(reading) {
  const newReading = {
    id:
      mockMeterReadingData.length > 0
        ? Math.max(
            ...mockMeterReadingData.map(
              ({ id }) => id
            )
          ) + 1
        : 1,
    ...reading,
  };

  mockMeterReadingData.push(newReading);

  return newReading;
}

export function updateMeterReading(
  id,
  updatedReading
) {
  const index =
    mockMeterReadingData.findIndex(
      (reading) =>
        reading.id === Number(id)
    );

  if (index === -1) {
    return null;
  }

  mockMeterReadingData[index] = {
    ...mockMeterReadingData[index],
    ...updatedReading,
    id: Number(id),
  };

  return mockMeterReadingData[index];
}

export function deleteMeterReading(id) {
  const index =
    mockMeterReadingData.findIndex(
      (reading) =>
        reading.id === Number(id)
    );

  if (index === -1) {
    return false;
  }

  mockMeterReadingData.splice(index, 1);

  return true;
}

export function resetMeterReadings(data) {
  mockMeterReadingData.length = 0;

  mockMeterReadingData.push(...data);
}