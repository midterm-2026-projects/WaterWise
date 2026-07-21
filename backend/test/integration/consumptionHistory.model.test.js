import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import { findConsumptionHistory } from "../../models/consumptionHistory.model.js";
import consumptionHistoryRouter from "../../routes/consumptionHistory.routes.js";
import { clearSession, loginUser } from "../../services/AuthService.js";

const app = express();
app.use(express.json());
app.use("/api/consumption", consumptionHistoryRouter);

describe("Consumption History Model and API Integration", () => {
  beforeEach(() => {
    clearSession();
  });

  it("returns full monthly arrays from the database model without clipping", async () => {
    const records = await findConsumptionHistory({
      userId: 2,
      year: 2025,
    });

    expect(records).toHaveLength(1);
    expect(records[0].monthlyData).toHaveLength(12);
    expect(records[0].monthlyData.at(-1)).toBe(175);
  });

  it("only returns records owned by the authenticated consumer ID", async () => {
    const records = await findConsumptionHistory({ userId: 2 });

    expect(records).not.toHaveLength(0);
    expect(records.every(({ userId }) => userId === 2)).toBe(true);
    expect(records.some(({ userId }) => userId === 3)).toBe(false);
  });

  it("rejects model lookups that do not include an authenticated user ID", async () => {
    await expect(findConsumptionHistory({ year: 2025 })).rejects.toThrow(
      "A valid authenticated user ID is required."
    );
  });

  it("GET /api/consumption returns a valid JSON array of chart objects", async () => {
    await loginUser({ email: "tenant@gmail.com", password: "tenant123" });
    const response = await request(app).get("/api/consumption");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        month: expect.any(String),
        consumption: expect.any(Number),
      })
    );
  });

  it("filters the logged-in consumer's results by year", async () => {
    await loginUser({ email: "tenant@gmail.com", password: "tenant123" });
    const response = await request(app)
      .get("/api/consumption")
      .query({ year: 2025 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(12);
    expect(
      response.body.every(({ month }) => month.startsWith("2025-"))
    ).toBe(true);
  });

  it("ignores a forged userId query and never returns another consumer's records", async () => {
    await loginUser({ email: "tenant@gmail.com", password: "tenant123" });
    const response = await request(app)
      .get("/api/consumption")
      .query({ userId: 3, year: 2025 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(12);
    expect(response.body[0].consumption).toBe(140);
    expect(response.body[0].consumption).not.toBe(90);
  });

  it("returns 401 when no consumer is logged in", async () => {
    const response = await request(app).get("/api/consumption");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      success: false,
      message: "Unauthorized.",
    });
  });


  it("returns an empty JSON array when no history matches", async () => {
    await loginUser({ email: "tenant@gmail.com", password: "tenant123" });
    const response = await request(app)
      .get("/api/consumption")
      .query({ year: 1990 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
