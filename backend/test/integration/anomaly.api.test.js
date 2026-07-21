import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import express from "express";
import request from "supertest";

const {
  generateOverallMonthlyAnomaly,
  generateOverallYearlyAnomaly,
  generatePerPurokMonthlyAnomaly,
  generatePerPurokYearlyAnomaly,
  generateAllPuroksMonthlyAnomaly,
  generateAllPuroksYearlyAnomaly,
  generateAllAnomaliesService,
} = vi.hoisted(() => ({
  generateOverallMonthlyAnomaly:
    vi.fn(),

  generateOverallYearlyAnomaly:
    vi.fn(),

  generatePerPurokMonthlyAnomaly:
    vi.fn(),

  generatePerPurokYearlyAnomaly:
    vi.fn(),

  generateAllPuroksMonthlyAnomaly:
    vi.fn(),

  generateAllPuroksYearlyAnomaly:
    vi.fn(),

  generateAllAnomaliesService:
    vi.fn(),
}));

vi.mock(
  "../../services/anomaly.service.js",
  () => ({
    generateOverallMonthlyAnomaly,
    generateOverallYearlyAnomaly,
    generatePerPurokMonthlyAnomaly,
    generatePerPurokYearlyAnomaly,
    generateAllPuroksMonthlyAnomaly,
    generateAllPuroksYearlyAnomaly,
    generateAllAnomaliesService,
  })
);

import anomalyRoutes from "../../routes/anomalyRoutes.js";

const app = express();

app.use(express.json());
app.use(anomalyRoutes);

describe(
  "Anomaly API Integration",
  () => {

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it(
      "GET /overall/monthly should return the overall monthly anomaly analysis",
      async () => {

        // Arrange

        const anomaly = {
          status: "HIGH",
          hasAnomaly: true,
          riskScore: 84,
          summary:
            "A significant spike in water consumption was detected.",
          anomalies: [
            {
              period: "June",
              actualConsumption: 780,
              expectedConsumption: 520,
              percentIncrease: 50,
              reason:
                "Consumption increased significantly compared to the historical trend.",
            },
          ],
        };

        generateOverallMonthlyAnomaly
          .mockResolvedValue(
            anomaly
          );

        // Act

        const response =
          await request(app).get(
            "/overall/monthly"
          );

        // Assert

        expect(response.status).toBe(200);

        expect(
          response.headers["content-type"]
        ).toMatch(/json/);

        expect(response.body).toEqual({
          success: true,
          data: anomaly,
        });

        expect(
          generateOverallMonthlyAnomaly
        ).toHaveBeenCalledOnce();
      }
    );

    it(
      "GET /overall/yearly should return the overall yearly anomaly analysis",
      async () => {

        // Arrange

        const anomaly = {
          status: "MEDIUM",
          hasAnomaly: true,
          riskScore: 65,
          summary:
            "A noticeable increase in yearly water consumption was detected.",
          anomalies: [
            {
              period: "2025",
              actualConsumption: 6120,
              expectedConsumption: 5200,
              percentIncrease: 17.7,
              reason:
                "Yearly consumption exceeded the expected trend.",
            },
          ],
        };

        generateOverallYearlyAnomaly
          .mockResolvedValue(
            anomaly
          );

        // Act

        const response =
          await request(app).get(
            "/overall/yearly"
          );

        // Assert

        expect(response.status).toBe(200);

        expect(
          response.headers["content-type"]
        ).toMatch(/json/);

        expect(response.body).toEqual({
          success: true,
          data: anomaly,
        });

        expect(
          generateOverallYearlyAnomaly
        ).toHaveBeenCalledOnce();
      }
    );

        it(
      "GET /purok/:purok/monthly should return the monthly anomaly analysis for the specified purok",
      async () => {

        // Arrange

        const anomaly = {
          purok: "Purok 1",
          status: "HIGH",
          hasAnomaly: true,
          riskScore: 89,
          summary:
            "A significant spike in monthly consumption was detected.",
          anomalies: [
            {
              period: "June",
              actualConsumption: 250,
              expectedConsumption: 170,
              percentIncrease: 47.1,
              reason:
                "Consumption increased significantly compared to the historical trend.",
            },
          ],
        };

        generatePerPurokMonthlyAnomaly
          .mockResolvedValue(
            anomaly
          );

        // Act

        const response =
          await request(app).get(
            "/purok/Purok 1/monthly"
          );

        // Assert

        expect(response.status).toBe(200);

        expect(
          response.headers["content-type"]
        ).toMatch(/json/);

        expect(response.body).toEqual({
          success: true,
          data: anomaly,
        });

        expect(
          generatePerPurokMonthlyAnomaly
        ).toHaveBeenCalledWith(
          "Purok 1"
        );
      }
    );

    it(
      "GET /purok/:purok/yearly should return the yearly anomaly analysis for the specified purok",
      async () => {

        // Arrange

        const anomaly = {
          purok: "Purok 2",
          status: "MEDIUM",
          hasAnomaly: true,
          riskScore: 68,
          summary:
            "Yearly consumption is above the historical trend.",
          anomalies: [
            {
              period: "2025",
              actualConsumption: 2980,
              expectedConsumption: 2450,
              percentIncrease: 21.6,
              reason:
                "Consumption exceeded the expected yearly trend.",
            },
          ],
        };

        generatePerPurokYearlyAnomaly
          .mockResolvedValue(
            anomaly
          );

        // Act

        const response =
          await request(app).get(
            "/purok/Purok 2/yearly"
          );

        // Assert

        expect(response.status).toBe(200);

        expect(
          response.headers["content-type"]
        ).toMatch(/json/);

        expect(response.body).toEqual({
          success: true,
          data: anomaly,
        });

        expect(
          generatePerPurokYearlyAnomaly
        ).toHaveBeenCalledWith(
          "Purok 2"
        );
      }
    );

    it(
      "GET /puroks/monthly should return the monthly anomaly analysis for all puroks",
      async () => {

        // Arrange

        const anomalies = [
          {
            purok: "Purok 1",
            status: "HIGH",
            hasAnomaly: true,
            riskScore: 90,
            summary:
              "Significant monthly spike detected.",
            anomalies: [
              {
                period: "June",
                actualConsumption: 250,
                expectedConsumption: 170,
                percentIncrease: 47.1,
                reason:
                  "Consumption increased significantly compared to the historical trend.",
              },
            ],
          },
          {
            purok: "Purok 2",
            status: "NORMAL",
            hasAnomaly: false,
            riskScore: 0,
            summary:
              "No abnormal consumption detected.",
            anomalies: [],
          },
        ];

        generateAllPuroksMonthlyAnomaly
          .mockResolvedValue(
            anomalies
          );

        // Act

        const response =
          await request(app).get(
            "/puroks/monthly"
          );

        // Assert

        expect(response.status).toBe(200);

        expect(
          response.headers["content-type"]
        ).toMatch(/json/);

        expect(response.body).toEqual({
          success: true,
          data: anomalies,
        });

        expect(
          generateAllPuroksMonthlyAnomaly
        ).toHaveBeenCalledOnce();
      }
    );

    it(
      "GET /puroks/yearly should return the yearly anomaly analysis for all puroks",
      async () => {

        // Arrange

        const anomalies = [
          {
            purok: "Purok 1",
            status: "LOW",
            hasAnomaly: true,
            riskScore: 35,
            summary:
              "Minor increase in yearly consumption detected.",
            anomalies: [
              {
                period: "2025",
                actualConsumption: 2810,
                expectedConsumption: 2620,
                percentIncrease: 7.3,
                reason:
                  "Consumption is slightly above the historical trend.",
              },
            ],
          },
        ];

        generateAllPuroksYearlyAnomaly
          .mockResolvedValue(
            anomalies
          );

        // Act

        const response =
          await request(app).get(
            "/puroks/yearly"
          );

        // Assert

        expect(response.status).toBe(200);

        expect(
          response.headers["content-type"]
        ).toMatch(/json/);

        expect(response.body).toEqual({
          success: true,
          data: anomalies,
        });

        expect(
          generateAllPuroksYearlyAnomaly
        ).toHaveBeenCalledOnce();
      }
    );

        it(
      "GET /all should return all anomaly analyses",
      async () => {

        // Arrange

        const anomalies = {
          overallMonthly: {
            status: "HIGH",
            hasAnomaly: true,
            riskScore: 84,
            summary:
              "Monthly spike detected.",
            anomalies: [],
          },
          overallYearly: {
            status: "MEDIUM",
            hasAnomaly: true,
            riskScore: 61,
            summary:
              "Yearly increase detected.",
            anomalies: [],
          },
          allPuroksMonthly: [],
          allPuroksYearly: [],
        };

        generateAllAnomaliesService
          .mockResolvedValue(
            anomalies
          );

        // Act

        const response =
          await request(app).get(
            "/all"
          );

        // Assert

        expect(response.status).toBe(200);

        expect(
          response.headers["content-type"]
        ).toMatch(/json/);

        expect(response.body).toEqual({
          success: true,
          data: anomalies,
        });

        expect(
          generateAllAnomaliesService
        ).toHaveBeenCalledOnce();
      }
    );

    it(
      "GET /overall/monthly should return 500 when anomaly analysis fails",
      async () => {

        generateOverallMonthlyAnomaly
          .mockRejectedValueOnce(
            new Error(
              "Gemini API Error"
            )
          );

        const response =
          await request(app).get(
            "/overall/monthly"
          );

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
          success: false,
          message:
            "Gemini API Error",
        });
      }
    );

    it(
      "GET /overall/yearly should return 500 when anomaly analysis fails",
      async () => {

        generateOverallYearlyAnomaly
          .mockRejectedValueOnce(
            new Error(
              "Gemini API Error"
            )
          );

        const response =
          await request(app).get(
            "/overall/yearly"
          );

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
          success: false,
          message:
            "Gemini API Error",
        });
      }
    );

    it(
      "GET /purok/:purok/monthly should return 500 when anomaly analysis fails",
      async () => {

        generatePerPurokMonthlyAnomaly
          .mockRejectedValueOnce(
            new Error(
              "Gemini API Error"
            )
          );

        const response =
          await request(app).get(
            "/purok/Purok 1/monthly"
          );

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
          success: false,
          message:
            "Gemini API Error",
        });
      }
    );

    it(
      "GET /purok/:purok/yearly should return 500 when anomaly analysis fails",
      async () => {

        generatePerPurokYearlyAnomaly
          .mockRejectedValueOnce(
            new Error(
              "Gemini API Error"
            )
          );

        const response =
          await request(app).get(
            "/purok/Purok 1/yearly"
          );

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
          success: false,
          message:
            "Gemini API Error",
        });
      }
    );

    it(
      "GET /puroks/monthly should return 500 when anomaly analysis fails",
      async () => {

        generateAllPuroksMonthlyAnomaly
          .mockRejectedValueOnce(
            new Error(
              "Gemini API Error"
            )
          );

        const response =
          await request(app).get(
            "/puroks/monthly"
          );

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
          success: false,
          message:
            "Gemini API Error",
        });
      }
    );

    it(
      "GET /puroks/yearly should return 500 when anomaly analysis fails",
      async () => {

        generateAllPuroksYearlyAnomaly
          .mockRejectedValueOnce(
            new Error(
              "Gemini API Error"
            )
          );

        const response =
          await request(app).get(
            "/puroks/yearly"
          );

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
          success: false,
          message:
            "Gemini API Error",
        });
      }
    );

    it(
      "GET /all should return 500 when generating all anomaly analyses fails",
      async () => {

        generateAllAnomaliesService
          .mockRejectedValueOnce(
            new Error(
              "Gemini API Error"
            )
          );

        const response =
          await request(app).get(
            "/all"
          );

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
          success: false,
          message:
            "Gemini API Error",
        });
      }
    );

  }
);