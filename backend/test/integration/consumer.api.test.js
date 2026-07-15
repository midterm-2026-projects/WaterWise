import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const { getProfile } = vi.hoisted(() => ({
  getProfile: vi.fn(),
}));

vi.mock("dotenv/config", () => ({}));

vi.mock("../../controllers/consumerController.js", () => ({
  getProfile,
}));

vi.mock("../../routes/consumption.routes.js", async () => {
  const { default: express } = await import("express");

  return { default: express.Router() };
});

import app from "../../app.js";

describe("Consumer API - GET /api/profile", () => {
  beforeEach(() => {
    getProfile.mockReset();
  });

  it("returns the authenticated consumer profile", async () => {
    const profile = {
      id: "owner-uuid-101",
      name: "Iverene",
      email: "iverene@example.com",
      purok: "Purok 1",
      status: "Active",
    };

    getProfile.mockImplementationOnce((_req, res) => {
      res.status(200).json(profile);
    });

    const response = await request(app)
      .get("/api/profile")
      .set("Authorization", "Bearer valid-test-token-123");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(profile);
    expect(getProfile).toHaveBeenCalledOnce();
  });

  it("returns 404 when the consumer profile does not exist", async () => {
    getProfile.mockImplementationOnce((_req, res) => {
      res.status(404).json({
        error: "Not Found",
        message: "Profile record could not be found.",
      });
    });

    const response = await request(app)
      .get("/api/profile")
      .set("Authorization", "Bearer valid-test-token-123");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Not Found",
      message: "Profile record could not be found.",
    });
    expect(getProfile).toHaveBeenCalledOnce();
  });

  it("returns 500 when an unexpected error occurs", async () => {
    getProfile.mockImplementationOnce((_req, res) => {
      res.status(500).json({
        error: "Internal Server Error",
        message: "Unable to retrieve the consumer profile.",
      });
    });

    const response = await request(app)
      .get("/api/profile")
      .set("Authorization", "Bearer valid-test-token-123");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Internal Server Error",
      message: "Unable to retrieve the consumer profile.",
    });
    expect(getProfile).toHaveBeenCalledOnce();
  });
});
