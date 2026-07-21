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

  // Purok

  // Get Monthly Prediction
  http.get("/api/purok/monthly", () => {
    return HttpResponse.json([
      {
        purok: "Purok 1",
        latestYear: 2025,
        historical: [],
        predicted: 1400,
      },
      {
        purok: "Purok 2",
        latestYear: 2025,
        historical: [],
        predicted: 1500,
      },
      {
        purok: "Purok 3",
        latestYear: 2025,
        historical: [],
        predicted: 1600,
      },
      {
        purok: "Purok 4",
        latestYear: 2025,
        historical: [],
        predicted: 1700,
      },
      {
        purok: "Purok 5",
        latestYear: 2025,
        historical: [],
        predicted: 1800,
      },
      {
        purok: "Purok 6",
        latestYear: 2025,
        historical: [],
        predicted: 1900,
      },
    ]);
  }),

  // Get Yearly Prediction
  http.get("/api/purok/yearly", () => {
    return HttpResponse.json([
      {
        purok: "Purok 1",
        historical: [],
        predicted: 16000,
      },
      {
        purok: "Purok 2",
        historical: [],
        predicted: 17000,
      },
      {
        purok: "Purok 3",
        historical: [],
        predicted: 18000,
      },
      {
        purok: "Purok 4",
        historical: [],
        predicted: 19000,
      },
      {
        purok: "Purok 5",
        historical: [],
        predicted: 20000,
      },
      {
        purok: "Purok 6",
        historical: [],
        predicted: 21000,
      },
    ]);
  }),

  // Overall

  // Get Monthly Prediction
  http.get("/api/monthly", () => {
    return HttpResponse.json([
      {
        month: "2025-01",
        consumption: 3000,
        predicted: false,
      },
      {
        month: "2025-02",
        consumption: 3200,
        predicted: false,
      },
      {
        month: "2025-03",
        consumption: 3500,
        predicted: false,
      },
      {
        month: "2025-04",
        consumption: 3800,
        predicted: false,
      },
      {
        month: "2025-05",
        consumption: 4000,
        predicted: false,
      },
      {
        month: "2025-06",
        consumption: 4500,
        predicted: true,
      },
    ]);
  }),

  // Get Yearly Prediction
  http.get("/api/yearly", () => {
    return HttpResponse.json([
      {
        year: 2021,
        consumption: 30000,
        predicted: false,
      },
      {
        year: 2022,
        consumption: 35000,
        predicted: false,
      },
      {
        year: 2023,
        consumption: 40000,
        predicted: false,
      },
      {
        year: 2024,
        consumption: 45000,
        predicted: false,
      },
      {
        year: 2025,
        consumption: 50000,
        predicted: false,
      },
      {
        year: 2026,
        consumption: 55000,
        predicted: true,
      },
    ]);
  }),

  // Ranking

  // Get Consumption Ranking
  http.get("/api/ranking", () => {
    return HttpResponse.json([
      {
        rank: 1,
        purok: "Purok 1",
        consumption: 5000,
      },
      {
        rank: 2,
        purok: "Purok 2",
        consumption: 4500,
      },
    ]);
  }),

    // History

  // Get Overall Monthly History
  http.get("/api/history/monthly", () => {
    return HttpResponse.json([
      {
        month: "January",
        consumption: 3000,
      },
    ]);
  }),

  // Get Overall Yearly History
  http.get("/api/history/yearly", () => {
    return HttpResponse.json([
      {
        year: 2025,
        consumption: 50000,
      },
    ]);
  }),

  // Get Purok Monthly History
  http.get("/api/history/monthly/purok/:purok", ({ params }) => {
    return HttpResponse.json([
      {
        purok: params.purok,
        month: "January",
        consumption: 1000,
      },
    ]);
  }),

  // Get Purok Yearly History
  http.get("/api/history/yearly/purok/:purok", ({ params }) => {
    return HttpResponse.json([
      {
        purok: params.purok,
        year: 2025,
        consumption: 15000,
      },
    ]);
  }),

  // Get All Puroks Monthly History
  http.get("/api/history/monthly/all-puroks", () => {
    return HttpResponse.json(
      Array.from({ length: 6 }, (_, i) => ({
        purok: `Purok ${i + 1}`,
        historical: [],
      }))
    );
  }),

  // Get All Puroks Yearly History
  http.get("/api/history/yearly/all-puroks", () => {
    return HttpResponse.json(
      Array.from({ length: 6 }, (_, i) => ({
        purok: `Purok ${i + 1}`,
        historical: [],
      }))
    );
  }),

  // Generate All History
  http.get("/api/history/generate-all", () => {
    return HttpResponse.json({
      overallMonthly: [],
      overallYearly: [],
      allPuroksMonthly: [],
      allPuroksYearly: [],
    });
  }),

    // AI Prediction

  // Get Overall Monthly Prediction
  http.get("/api/prediction/monthly/overall", () => {
    return HttpResponse.json({
      predictedConsumption: 6500,
    });
  }),

  // Get Overall Yearly Prediction
  http.get("/api/prediction/yearly/overall", () => {
    return HttpResponse.json({
      predictedConsumption: 75000,
    });
  }),

  // Get Purok Monthly Prediction
  http.get("/api/prediction/monthly/purok/:purok", ({ params }) => {
    return HttpResponse.json({
      purok: params.purok,
      predictedConsumption: 2500,
    });
  }),

  // Get Purok Yearly Prediction
  http.get("/api/prediction/yearly/purok/:purok", ({ params }) => {
    return HttpResponse.json({
      purok: params.purok,
      predictedConsumption: 30000,
    });
  }),

  // Get All Puroks Monthly Prediction
  http.get("/api/prediction/monthly/all-puroks", () => {
    return HttpResponse.json(
      Array.from({ length: 6 }, (_, i) => ({
        purok: `Purok ${i + 1}`,
        predictedConsumption: 2500 + i * 200,
      }))
    );
  }),

  // Get All Puroks Yearly Prediction
  http.get("/api/prediction/yearly/all-puroks", () => {
    return HttpResponse.json(
      Array.from({ length: 6 }, (_, i) => ({
        purok: `Purok ${i + 1}`,
        predictedConsumption: 30000 + i * 1000,
      }))
    );
  }),

  // Generate All Predictions
  http.get("/api/prediction/generate-all", () => {
    return HttpResponse.json({
      overallMonthly: {
        predictedConsumption: 6500,
      },

      overallYearly: {
        predictedConsumption: 75000,
      },

      allPuroksMonthly: [
        {
          purok: "Purok 1",
          predictedConsumption: 2500,
        },
        {
          purok: "Purok 2",
          predictedConsumption: 2700,
        },
        {
          purok: "Purok 3",
          predictedConsumption: 2900,
        },
        {
          purok: "Purok 4",
          predictedConsumption: 3100,
        },
        {
          purok: "Purok 5",
          predictedConsumption: 3300,
        },
        {
          purok: "Purok 6",
          predictedConsumption: 3500,
        },
      ],

      allPuroksYearly: [
        {
          purok: "Purok 1",
          predictedConsumption: 30000,
        },
        {
          purok: "Purok 2",
          predictedConsumption: 31000,
        },
        {
          purok: "Purok 3",
          predictedConsumption: 32000,
        },
        {
          purok: "Purok 4",
          predictedConsumption: 33000,
        },
        {
          purok: "Purok 5",
          predictedConsumption: 34000,
        },
        {
          purok: "Purok 6",
          predictedConsumption: 35000,
        },
      ],
    });
  }),
];



export default handlers;
