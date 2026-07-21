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

  // Anomaly

  // Get Overall Monthly Anomaly
  http.get("/api/anomaly/overall/monthly", () => {
    return HttpResponse.json({
      status: "HIGH",
      hasAnomaly: true,
      riskScore: 84,
      summary: "Monthly water consumption exceeded historical trends.",
      anomalies: [
        {
          period: "June 2025",
          actualConsumption: 1800,
          expectedConsumption: 1250,
          percentIncrease: 44,
          reason: "Sudden abnormal increase in consumption.",
        },
      ],
    });
  }),

  // Get Overall Yearly Anomaly
  http.get("/api/anomaly/overall/yearly", () => {
    return HttpResponse.json({
      status: "MEDIUM",
      hasAnomaly: true,
      riskScore: 60,
      summary: "Yearly consumption shows an increasing trend.",
      anomalies: [
        {
          period: "2025",
          actualConsumption: 75000,
          expectedConsumption: 55000,
          percentIncrease: 36,
          reason: "Yearly consumption exceeded expected value.",
        },
      ],
    });
  }),

  // Get Purok Monthly Anomaly
  http.get("/api/anomaly/purok/:purok/monthly", ({ params }) => {
    return HttpResponse.json({
      purok: params.purok,
      status: "HIGH",
      hasAnomaly: true,
      riskScore: 80,
      summary: "High water consumption detected in this purok.",
      anomalies: [
        {
          period: "June 2025",
          actualConsumption: 3000,
          expectedConsumption: 2000,
          percentIncrease: 50,
          reason: "Possible leakage or excessive water usage.",
        },
      ],
    });
  }),

  // Get Purok Yearly Anomaly
  http.get("/api/anomaly/purok/:purok/yearly", ({ params }) => {
    return HttpResponse.json({
      purok: params.purok,
      status: "NORMAL",
      hasAnomaly: false,
      riskScore: 0,
      summary: "No abnormal yearly consumption detected.",
      anomalies: [],
    });
  }),

  // Get All Puroks Monthly Anomaly
  http.get("/api/anomaly/puroks/monthly", () => {
    return HttpResponse.json([
      {
        purok: "Purok 1",
        status: "HIGH",
        hasAnomaly: true,
        riskScore: 85,
        summary: "High monthly consumption detected.",
        anomalies: [
          {
            period: "June 2025",
            actualConsumption: 3000,
            expectedConsumption: 2000,
            percentIncrease: 50,
            reason: "Possible leakage or excessive water usage.",
          },
        ],
      },
      {
        purok: "Purok 2",
        status: "NORMAL",
        hasAnomaly: false,
        riskScore: 0,
        summary: "No anomaly detected.",
        anomalies: [],
      },
    ]);
  }),

  // Get All Puroks Yearly Anomaly
  http.get("/api/anomaly/puroks/yearly", () => {
    return HttpResponse.json([
      {
        purok: "Purok 1",
        status: "MEDIUM",
        hasAnomaly: true,
        riskScore: 50,
        summary: "Moderate yearly consumption increase.",
        anomalies: [
          {
            period: "2025",
            actualConsumption: 28000,
            expectedConsumption: 21000,
            percentIncrease: 33,
            reason: "Yearly consumption exceeded expected value.",
          },
        ],
      },
      {
        purok: "Purok 2",
        status: "NORMAL",
        hasAnomaly: false,
        riskScore: 0,
        summary: "No abnormal yearly consumption detected.",
        anomalies: [],
      },
    ]);
  }),

  // Generate All Anomalies
  http.get("/api/anomaly/all", () => {
    return HttpResponse.json({
      overallMonthly: {
        status: "HIGH",
        hasAnomaly: true,
        riskScore: 84,
        summary: "Monthly water consumption exceeded historical trends.",
        anomalies: [
          {
            period: "June 2025",
            actualConsumption: 1800,
            expectedConsumption: 1250,
            percentIncrease: 44,
            reason: "Sudden abnormal increase in consumption.",
          },
        ],
      },

      overallYearly: {
        status: "MEDIUM",
        hasAnomaly: true,
        riskScore: 60,
        summary: "Yearly consumption shows an increasing trend.",
        anomalies: [
          {
            period: "2025",
            actualConsumption: 75000,
            expectedConsumption: 55000,
            percentIncrease: 36,
            reason: "Yearly consumption exceeded expected value.",
          },
        ],
      },

      allPuroksMonthly: [
        {
          purok: "Purok 1",
          status: "HIGH",
          hasAnomaly: true,
          riskScore: 85,
          summary: "High monthly consumption detected.",
          anomalies: [
            {
              period: "June 2025",
              actualConsumption: 3000,
              expectedConsumption: 2000,
              percentIncrease: 50,
              reason: "Possible leakage or excessive water usage.",
            },
          ],
        },
        {
          purok: "Purok 2",
          status: "NORMAL",
          hasAnomaly: false,
          riskScore: 0,
          summary: "No anomaly detected.",
          anomalies: [],
        },
      ],

      allPuroksYearly: [
        {
          purok: "Purok 1",
          status: "MEDIUM",
          hasAnomaly: true,
          riskScore: 50,
          summary: "Moderate yearly consumption increase.",
          anomalies: [
            {
              period: "2025",
              actualConsumption: 28000,
              expectedConsumption: 21000,
              percentIncrease: 33,
              reason: "Yearly consumption exceeded expected value.",
            },
          ],
        },
        {
          purok: "Purok 2",
          status: "NORMAL",
          hasAnomaly: false,
          riskScore: 0,
          summary: "No abnormal yearly consumption detected.",
          anomalies: [],
        },
      ],
    });
  }),
  // Recommendation

  // Get Overall Monthly Recommendations
  http.get("/api/recommendation/overall/monthly", () => {
    return HttpResponse.json({
      summary: "Monthly consumption trend requires monitoring.",
      recommendations: [
        {
          title: "Monitor Monthly Consumption",
          description: "Review monthly consumption trends regularly.",
        },
        {
          title: "Analyze Usage Pattern",
          description: "Compare current consumption with historical data.",
        },
      ],
    });
  }),

  // Get Overall Yearly Recommendations
  http.get("/api/recommendation/overall/yearly", () => {
    return HttpResponse.json({
      summary: "Yearly consumption shows noticeable changes.",
      recommendations: [
        {
          title: "Review Yearly Trend",
          description: "Analyze yearly consumption changes.",
        },
        {
          title: "Optimize Water Distribution",
          description: "Review yearly allocation to reduce excessive consumption.",
        },
      ],
    });
  }),

  // Get Purok Monthly Recommendations
  http.get("/api/recommendation/purok/:purok/monthly", ({ params }) => {
    return HttpResponse.json({
      purok: params.purok,
      summary: "Purok monthly consumption requires observation.",
      recommendations: [
        {
          title: "Monitor Purok Consumption",
          description: "Track monthly usage patterns for this purok.",
        },
        {
          title: "Inspect Possible Leakage",
          description: "Inspect pipelines and household connections.",
        },
      ],
    });
  }),

  // Get Purok Yearly Recommendations
  http.get("/api/recommendation/purok/:purok/yearly", ({ params }) => {
    return HttpResponse.json({
      purok: params.purok,
      summary: "Purok yearly consumption remains under monitoring.",
      recommendations: [
        {
          title: "Continue Monitoring",
          description: "Maintain yearly monitoring of water usage.",
        },
        {
          title: "Community Awareness",
          description: "Promote water conservation programs.",
        },
      ],
    });
  }),

  // Get All Puroks Monthly Recommendations
  http.get("/api/recommendation/puroks/monthly", () => {
    return HttpResponse.json([
      {
        purok: "Purok 1",
        summary: "Monthly consumption trend detected.",
        recommendations: [
          {
            title: "Review Usage",
            description: "Analyze monthly consumption behavior.",
          },
        ],
      },
      {
        purok: "Purok 2",
        summary: "Consumption remains stable.",
        recommendations: [
          {
            title: "Continue Monitoring",
            description: "Maintain current monitoring practices.",
          },
        ],
      },
    ]);
  }),

  // Get All Puroks Yearly Recommendations
  http.get("/api/recommendation/puroks/yearly", () => {
    return HttpResponse.json([
      {
        purok: "Purok 1",
        summary: "Yearly trend requires observation.",
        recommendations: [
          {
            title: "Analyze Yearly Consumption",
            description: "Compare yearly consumption patterns.",
          },
        ],
      },
      {
        purok: "Purok 2",
        summary: "Consumption remains stable.",
        recommendations: [
          {
            title: "Maintain Monitoring",
            description: "Continue yearly observation of consumption.",
          },
        ],
      },
    ]);
  }),

  // Generate All Recommendations
  http.get("/api/recommendation", () => {
    return HttpResponse.json({
      overallMonthly: {
        summary: "Monthly recommendations generated.",
        recommendations: [
          {
            title: "Monitor Monthly Consumption",
            description: "Review monthly water usage.",
          },
        ],
      },

      overallYearly: {
        summary: "Yearly recommendations generated.",
        recommendations: [
          {
            title: "Review Yearly Trend",
            description: "Analyze yearly water consumption.",
          },
        ],
      },

      allPuroksMonthly: [
        {
          purok: "Purok 1",
          summary: "Monthly monitoring required.",
          recommendations: [
            {
              title: "Inspect Usage",
              description: "Review monthly consumption.",
            },
          ],
        },
        {
          purok: "Purok 2",
          summary: "Consumption remains stable.",
          recommendations: [
            {
              title: "Continue Monitoring",
              description: "Maintain monitoring activities.",
            },
          ],
        },
      ],

      allPuroksYearly: [
        {
          purok: "Purok 1",
          summary: "Yearly monitoring required.",
          recommendations: [
            {
              title: "Analyze Consumption",
              description: "Review yearly trends.",
            },
          ],
        },
        {
          purok: "Purok 2",
          summary: "Yearly consumption is stable.",
          recommendations: [
            {
              title: "Maintain Monitoring",
              description: "Continue yearly observation.",
            },
          ],
        },
      ],
    });
  }),
];



export default handlers;
