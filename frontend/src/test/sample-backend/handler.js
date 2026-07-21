import { http, HttpResponse } from "msw";

let nextId = 1;

function isObjectPayload(payload) {
  return (
    payload !== null &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    Object.keys(payload).length > 0
  );
}

function createPostHandler(path, resourceName) {
  return http.post(`*/api/${path}`, async ({ request }) => {
    let payload;

    try {
      payload = await request.json();
    } catch {
      return HttpResponse.json(
        { message: "The request body must contain valid JSON." },
        { status: 400 },
      );
    }

    if (!isObjectPayload(payload)) {
      return HttpResponse.json(
        { message: "The request body cannot be empty." },
        { status: 400 },
      );
    }

    const record = {
      id: nextId++,
      ...payload,
      createdAt: new Date().toISOString(),
    };

    return HttpResponse.json(
      {
        data: record,
        message: `${resourceName} created successfully.`,
      },
      { status: 201 },
    );
  });
}

export const handlers = [
  http.post("*/api/auth/login", async ({ request }) => {
    const credentials = await request.json();

    if (!credentials.email || !credentials.password) {
      return HttpResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      success: true,
      message: "Login successful.",
      user: { id: 2, email: credentials.email, role: "consumer" },
    });
  }),
  http.get("*/api/auth/me", () =>
    HttpResponse.json({
      success: true,
      user: {
        id: 2,
        name: "Test Consumer",
        email: "consumer@sucolwater.local",
        role: "consumer",
      },
    }),
  ),
  http.get("*/api/profile", () =>
    HttpResponse.json({
      id: 2,
      name: "Test Consumer",
      email: "consumer@sucolwater.local",
      purok_no: 3,
      status: "active",
      readings: [],
      invoices: [],
    }),
  ),
  http.get("*/api/billing/history", () => HttpResponse.json([])),
  http.get("*/api/billing/current", () =>
    HttpResponse.json({ unpaid_balance_total: 450 }),
  ),
  http.get("*/api/notifications", () =>
    HttpResponse.json({
      unreadCount: 0,
      streams: { accountBills: [], adminAnnouncements: [] },
    }),
  ),
  http.get("*/api/consumption", () =>
    HttpResponse.json([
      { month: "2025-01", consumption: 140 },
      { month: "2025-02", consumption: 145 },
      { month: "2025-03", consumption: 150 },
    ]),
  ),
  createPostHandler("consumers", "Consumer"),
  createPostHandler("payments", "Payment"),
  createPostHandler("events", "Event"),
  createPostHandler("announcements", "Announcement"),
];

export default handlers;
