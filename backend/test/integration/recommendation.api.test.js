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
  generateOverallMonthlyRecommendations,
  generateOverallYearlyRecommendations,
  generatePerPurokMonthlyRecommendations,
  generatePerPurokYearlyRecommendations,
  generateAllPuroksMonthlyRecommendations,
  generateAllPuroksYearlyRecommendations,
  generateAllRecommendationsService,
} = vi.hoisted(() => ({
  generateOverallMonthlyRecommendations:
    vi.fn(),

  generateOverallYearlyRecommendations:
    vi.fn(),

  generatePerPurokMonthlyRecommendations:
    vi.fn(),

  generatePerPurokYearlyRecommendations:
    vi.fn(),

  generateAllPuroksMonthlyRecommendations:
    vi.fn(),

  generateAllPuroksYearlyRecommendations:
    vi.fn(),

  generateAllRecommendationsService:
    vi.fn(),
}));

vi.mock(
  "../../services/recommendation.service.js",
  () => ({
    generateOverallMonthlyRecommendations,
    generateOverallYearlyRecommendations,
    generatePerPurokMonthlyRecommendations,
    generatePerPurokYearlyRecommendations,
    generateAllPuroksMonthlyRecommendations,
    generateAllPuroksYearlyRecommendations,
    generateAllRecommendationsService,
  })
);

import recommendationRoutes from "../../routes/recommendationRoutes.js";

const app = express();

app.use(express.json());
app.use(recommendationRoutes);

describe(
  "Recommendation API Integration",
  () => {

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it(
      "GET /overall/monthly should return the overall monthly recommendations",
      async () => {

        // Arrange

        const recommendations = {
          summary:
            "Monthly consumption increased compared to previous months.",

          recommendations: [
            {
              title:
                "Increase Consumption Monitoring",
              description:
                "Closely monitor water consumption during the next billing cycle."
            },
            {
              title:
                "Verify Meter Readings",
              description:
                "Review recent meter readings to ensure data accuracy."
            },
            {
              title:
                "Conduct Routine Field Inspection",
              description:
                "Inspect affected service areas to identify possible operational concerns."
            }
          ]
        };

        generateOverallMonthlyRecommendations
          .mockResolvedValue(
            recommendations
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
          data: recommendations,
        });

        expect(
          generateOverallMonthlyRecommendations
        ).toHaveBeenCalledOnce();
      }
    );

    it(
      "GET /overall/yearly should return the overall yearly recommendations",
      async () => {

        // Arrange

        const recommendations = {
          summary:
            "Yearly water consumption shows a gradual upward trend.",

          recommendations: [
            {
              title:
                "Review Long-Term Consumption Trends",
              description:
                "Continue evaluating yearly consumption to support future planning."
            },
            {
              title:
                "Assess System Capacity",
              description:
                "Review whether the existing water distribution capacity remains sufficient."
            },
            {
              title:
                "Maintain Regular Monitoring",
              description:
                "Continue monitoring yearly consumption for sustained changes."
            }
          ]
        };

        generateOverallYearlyRecommendations
          .mockResolvedValue(
            recommendations
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
          data: recommendations,
        });

        expect(
          generateOverallYearlyRecommendations
        ).toHaveBeenCalledOnce();
      }
    );

        it(
      "GET /purok/:purok/monthly should return the monthly recommendations for the specified purok",
      async () => {

        // Arrange

        const recommendations = {
          purok: "Purok 1",

          summary:
            "Monthly consumption in Purok 1 has increased compared to previous months.",

          recommendations: [
            {
              title:
                "Increase Consumption Monitoring",
              description:
                "Closely monitor water consumption in Purok 1 during the next billing cycle."
            },
            {
              title:
                "Verify Meter Readings",
              description:
                "Review recent meter readings to ensure recorded consumption is accurate."
            },
            {
              title:
                "Conduct Routine Field Inspection",
              description:
                "Perform routine inspections in Purok 1 to identify operational concerns."
            }
          ]
        };

        generatePerPurokMonthlyRecommendations
          .mockResolvedValue(
            recommendations
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
          data: recommendations,
        });

        expect(
          generatePerPurokMonthlyRecommendations
        ).toHaveBeenCalledWith(
          "Purok 1"
        );
      }
    );

    it(
      "GET /purok/:purok/yearly should return the yearly recommendations for the specified purok",
      async () => {

        // Arrange

        const recommendations = {
          purok: "Purok 2",

          summary:
            "Yearly consumption in Purok 2 shows a gradual upward trend.",

          recommendations: [
            {
              title:
                "Review Yearly Consumption Trends",
              description:
                "Continue evaluating yearly water consumption for long-term planning."
            },
            {
              title:
                "Assess Distribution Capacity",
              description:
                "Review whether the current water distribution capacity remains sufficient."
            },
            {
              title:
                "Maintain Routine Monitoring",
              description:
                "Continue monitoring yearly consumption for sustained changes."
            }
          ]
        };

        generatePerPurokYearlyRecommendations
          .mockResolvedValue(
            recommendations
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
          data: recommendations,
        });

        expect(
          generatePerPurokYearlyRecommendations
        ).toHaveBeenCalledWith(
          "Purok 2"
        );
      }
    );

        it(
      "GET /puroks/monthly should return the monthly recommendations for all puroks",
      async () => {

        // Arrange

        const recommendations = [
          {
            purok: "Purok 1",

            summary:
              "Monthly consumption remained stable.",

            recommendations: [
              {
                title:
                  "Continue Routine Monitoring",
                description:
                  "Continue monitoring monthly water consumption trends."
              },
              {
                title:
                  "Review Monthly Reports",
                description:
                  "Review monthly consumption reports for any emerging changes."
              }
            ]
          },
          {
            purok: "Purok 2",

            summary:
              "Monthly consumption increased slightly.",

            recommendations: [
              {
                title:
                  "Increase Consumption Monitoring",
                description:
                  "Closely monitor consumption during the next billing cycle."
              },
              {
                title:
                  "Verify Meter Readings",
                description:
                  "Review recent meter readings to ensure recorded values are accurate."
              }
            ]
          }
        ];

        generateAllPuroksMonthlyRecommendations
          .mockResolvedValue(
            recommendations
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
          data: recommendations,
        });

        expect(
          generateAllPuroksMonthlyRecommendations
        ).toHaveBeenCalledOnce();
      }
    );

    it(
      "GET /puroks/yearly should return the yearly recommendations for all puroks",
      async () => {

        // Arrange

        const recommendations = [
          {
            purok: "Purok 1",

            summary:
              "Yearly consumption has gradually increased.",

            recommendations: [
              {
                title:
                  "Review Long-Term Consumption Trends",
                description:
                  "Continue evaluating yearly consumption for planning purposes."
              },
              {
                title:
                  "Maintain Routine Monitoring",
                description:
                  "Continue monitoring yearly consumption for sustained changes."
              }
            ]
          }
        ];

        generateAllPuroksYearlyRecommendations
          .mockResolvedValue(
            recommendations
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
          data: recommendations,
        });

        expect(
          generateAllPuroksYearlyRecommendations
        ).toHaveBeenCalledOnce();
      }
    );

    it(
      "GET / should return all recommendation categories",
      async () => {

        // Arrange

        const recommendations = {
          overallMonthly: {
            summary:
              "Monthly consumption increased compared to previous months.",
            recommendations: [
              {
                title:
                  "Increase Consumption Monitoring",
                description:
                  "Closely monitor consumption during the next billing cycle."
              }
            ]
          },

          overallYearly: {
            summary:
              "Yearly consumption remained stable.",
            recommendations: [
              {
                title:
                  "Continue Routine Monitoring",
                description:
                  "Maintain regular review of yearly consumption trends."
              }
            ]
          },

          allPuroksMonthly: [
            {
              purok: "Purok 1",
              summary:
                "Monthly consumption remained stable.",
              recommendations: []
            }
          ],

          allPuroksYearly: [
            {
              purok: "Purok 1",
              summary:
                "Yearly consumption remained stable.",
              recommendations: []
            }
          ]
        };

        generateAllRecommendationsService
          .mockResolvedValue(
            recommendations
          );

        // Act

        const response =
          await request(app).get(
            "/"
          );

        // Assert

        expect(response.status).toBe(200);

        expect(
          response.headers["content-type"]
        ).toMatch(/json/);

        expect(response.body).toEqual({
          success: true,
          data: recommendations,
        });

        expect(
          generateAllRecommendationsService
        ).toHaveBeenCalledOnce();
      }
    );

        it(
      "GET /overall/monthly should return 500 when recommendation generation fails",
      async () => {

        // Arrange

        generateOverallMonthlyRecommendations
          .mockRejectedValueOnce(
            new Error(
              "Gemini API Error"
            )
          );

        // Act

        const response =
          await request(app).get(
            "/overall/monthly"
          );

        // Assert

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
          success: false,
          message:
            "Gemini API Error",
        });
      }
    );

    it(
      "GET /overall/yearly should return 500 when recommendation generation fails",
      async () => {

        generateOverallYearlyRecommendations
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
      "GET /purok/:purok/monthly should return 500 when recommendation generation fails",
      async () => {

        generatePerPurokMonthlyRecommendations
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
      "GET /purok/:purok/yearly should return 500 when recommendation generation fails",
      async () => {

        generatePerPurokYearlyRecommendations
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
      "GET /puroks/monthly should return 500 when recommendation generation fails",
      async () => {

        generateAllPuroksMonthlyRecommendations
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
      "GET /puroks/yearly should return 500 when recommendation generation fails",
      async () => {

        generateAllPuroksYearlyRecommendations
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
      "GET / should return 500 when generating all recommendations fails",
      async () => {

        generateAllRecommendationsService
          .mockRejectedValueOnce(
            new Error(
              "Gemini API Error"
            )
          );

        const response =
          await request(app).get(
            "/"
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