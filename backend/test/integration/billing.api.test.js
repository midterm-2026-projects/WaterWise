import { beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import request from "supertest";

const { fetchAllBilling } = vi.hoisted(() => ({
  fetchAllBilling: vi.fn(),
}));

vi.mock("../../services/billing.service.js", () => ({
  fetchAllBilling,
}));

import billingRoutes from "../../routes/billingRoutes.js";

const app = express();
app.use(express.json());
app.use(billingRoutes);

describe("Billing API", () => {
  const billingCycles = [
    {
      id: 1,
      user_id: 101,
      billing_date: "2026-05-01",
      due_date: "2026-05-15",
      total_bill: 300,
      remaining_balance: 0,
      status: "Paid",
    },
    {
      id: 2,
      user_id: 101,
      billing_date: "2026-06-01",
      due_date: "2026-06-15",
      total_bill: 450,
      remaining_balance: 450,
      status: "Unpaid",
    },
    {
      id: 3,
      user_id: 101,
      billing_date: "2026-07-01",
      due_date: "2026-07-15",
      total_bill: 500,
      remaining_balance: 200,
      status: "Partially Paid",
    },
  ];

  beforeEach(() => {
    fetchAllBilling.mockReset();
    fetchAllBilling.mockResolvedValue(billingCycles);
  });

  it("GET /api/billing/current returns the immediate unpaid balance total", async () => {
    const response = await request(app).get("/api/billing/current");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({
      unpaid_balance_total: 650,
    });
    expect(fetchAllBilling).toHaveBeenCalledOnce();
  });

  it("GET /api/billing/history returns past billing cycle objects", async () => {
    const response = await request(app).get("/api/billing/history");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual(billingCycles);
    expect(Array.isArray(response.body)).toBe(true);
    expect(fetchAllBilling).toHaveBeenCalledOnce();
  });

  it("GET /api/billing/current returns zero when there are no billing records", async () => {
    fetchAllBilling.mockResolvedValueOnce([]);

    const response = await request(app).get("/api/billing/current");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      unpaid_balance_total: 0,
    });
  });

  it("GET /api/billing/history returns an empty array when no past cycles exist", async () => {
    fetchAllBilling.mockResolvedValueOnce([]);

    const response = await request(app).get("/api/billing/history");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /api/billing/current returns 500 when billing retrieval fails", async () => {
    fetchAllBilling.mockRejectedValueOnce(new Error("Database unavailable"));

    const response = await request(app).get("/api/billing/current");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Internal Server Error",
      message: "Unable to retrieve the current billing balance.",
    });
  });

  it("GET /api/billing/history returns 500 when billing retrieval fails", async () => {
    fetchAllBilling.mockRejectedValueOnce(new Error("Database unavailable"));

    const response = await request(app).get("/api/billing/history");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Internal Server Error",
      message: "Unable to retrieve billing history.",
    });
  });
});
