import { apiRequest } from "./apiClient";

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function toUsageRecord(record) {
  if (
    typeof record?.month !== "string" ||
    !/^\d{4}-(0[1-9]|1[0-2])$/.test(record.month) ||
    !Number.isFinite(record.consumption)
  ) {
    throw new TypeError("The server returned an invalid consumption history record.");
  }

  return {
    month: monthFormatter.format(new Date(`${record.month}-01T00:00:00Z`)),
    volume: record.consumption,
  };
}

export async function fetchConsumptionHistory({ signal } = {}) {
  const data = await apiRequest("/api/consumption", { signal });

  if (!Array.isArray(data)) {
    throw new TypeError("The server returned an invalid consumption history response.");
  }

  return data.map(toUsageRecord);
}
