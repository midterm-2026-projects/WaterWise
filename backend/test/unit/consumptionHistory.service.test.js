import { beforeEach, describe, expect, it, vi } from "vitest";

import { findConsumptionHistory } from "../../models/consumptionHistory.model.js";
import { getConsumptionHistory } from "../../services/consumptionHistory.service.js";

vi.mock("../../models/consumptionHistory.model.js", () => ({
  findConsumptionHistory: vi.fn(),
}));

describe("Consumption History Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retrieves every pre-computed monthly value without clipping", async () => {
    const monthlyData = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112];
    findConsumptionHistory.mockResolvedValue([
      { userId: 2, year: 2025, monthlyData },
    ]);

    const result = await getConsumptionHistory({ userId: 2, year: 2025 });

    expect(result).toHaveLength(monthlyData.length);
    expect(result.map(({ consumption }) => consumption)).toEqual(monthlyData);
    expect(result.at(-1)).toEqual({
      month: "2025-12",
      consumption: 112,
    });
    expect(findConsumptionHistory).toHaveBeenCalledWith({ userId: 2, year: 2025 });
  });

  it("maps multiple database documents into one chart-ready JSON array", async () => {
    findConsumptionHistory.mockResolvedValue([
      { userId: 2, year: 2024, monthlyData: [10, 20] },
      { userId: 2, year: 2025, monthlyData: [30] },
    ]);

    await expect(getConsumptionHistory({ userId: 2 })).resolves.toEqual([
      { month: "2024-01", consumption: 10 },
      { month: "2024-02", consumption: 20 },
      { month: "2025-01", consumption: 30 },
    ]);
  });

  it("returns an empty array when the lookup has no matches", async () => {
    findConsumptionHistory.mockResolvedValue([]);

    await expect(getConsumptionHistory({ userId: 2, year: 1990 })).resolves.toEqual([]);
  });

  it("rejects malformed monthly database data", async () => {
    findConsumptionHistory.mockResolvedValue([
      { userId: 2, year: 2025, monthlyData: "not-an-array" },
    ]);

    await expect(getConsumptionHistory({ userId: 2 })).rejects.toThrow(
      "Consumption history monthlyData must be an array."
    );
  });

  it("propagates database lookup errors", async () => {
    findConsumptionHistory.mockRejectedValue(new Error("Database unavailable"));

    await expect(getConsumptionHistory({ userId: 2 })).rejects.toThrow("Database unavailable");
  });

  it("rejects a lookup without an authenticated user ID", async () => {
    await expect(getConsumptionHistory({ year: 2025 })).rejects.toThrow(
      "A valid authenticated user ID is required."
    );
    expect(findConsumptionHistory).not.toHaveBeenCalled();
  });
});
