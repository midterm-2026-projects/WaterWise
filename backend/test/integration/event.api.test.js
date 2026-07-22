import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../services/EventService.js", () => ({
  createEvent: vi.fn(),
  readEvents: vi.fn(),
  searchEvent: vi.fn(),
  editEvent: vi.fn(),
  removeEvent: vi.fn(),
}));

import * as eventService from "../../services/EventService.js";
import eventRoutes from "../../routes/eventRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/events", eventRoutes);

const event = {
  id: 1,
  title: "Water System Maintenance",
  description: "Scheduled system maintenance.",
  date: "2026-07-30",
  time: "09:00 AM",
  location: "Purok 3",
  tags: ["Maintenance"],
  status: "Scheduled",
};

describe("Event API", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lists events", async () => {
    eventService.readEvents.mockResolvedValue([event]);
    const response = await request(app).get("/api/events");
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([event]);
  });

  it("gets an event by ID", async () => {
    eventService.searchEvent.mockResolvedValue(event);
    const response = await request(app).get("/api/events/1");
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(event);
    expect(eventService.searchEvent).toHaveBeenCalledWith(1);
  });

  it("creates an event", async () => {
    eventService.createEvent.mockResolvedValue(event);
    const response = await request(app).post("/api/events").send(event);
    expect(response.status).toBe(201);
    expect(response.body.data).toEqual(event);
  });

  it("updates an event", async () => {
    eventService.editEvent.mockResolvedValue({ ...event, title: "Updated" });
    const response = await request(app).put("/api/events/1").send({ ...event, title: "Updated" });
    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe("Updated");
  });

  it("deletes an event", async () => {
    eventService.removeEvent.mockResolvedValue({ message: "Event deleted successfully." });
    const response = await request(app).delete("/api/events/1");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Event deleted successfully.");
  });

  it("returns validation errors", async () => {
    eventService.createEvent.mockRejectedValue(new Error(JSON.stringify({ title: "Event title is required." })));
    const response = await request(app).post("/api/events").send({});
    expect(response.status).toBe(400);
    expect(response.body.errors.title).toBe("Event title is required.");
  });

  it("returns 404 when an event does not exist", async () => {
    eventService.searchEvent.mockRejectedValue(new Error("Event not found."));
    const response = await request(app).get("/api/events/999");
    expect(response.status).toBe(404);
  });

  it("rejects invalid IDs", async () => {
    const response = await request(app).get("/api/events/not-a-number");
    expect(response.status).toBe(400);
  });
});
