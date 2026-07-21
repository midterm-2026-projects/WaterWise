import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  getOverallMonthlyRecommendations,
  getOverallYearlyRecommendations,
  getPerPurokMonthlyRecommendations,
  getPerPurokYearlyRecommendations,
  getAllPuroksMonthlyRecommendations,
  getAllPuroksYearlyRecommendations,
  getAllRecommendations,
} from "../../controllers/recommendation.controller.js";

import {
  generateOverallMonthlyRecommendations,
  generateOverallYearlyRecommendations,
  generatePerPurokMonthlyRecommendations,
  generatePerPurokYearlyRecommendations,
  generateAllPuroksMonthlyRecommendations,
  generateAllPuroksYearlyRecommendations,
  generateAllRecommendationsService,
} from "../../services/recommendation.service.js";

vi.mock("../../services/recommendation.service.js", () => ({
  generateOverallMonthlyRecommendations: vi.fn(),
  generateOverallYearlyRecommendations: vi.fn(),
  generatePerPurokMonthlyRecommendations: vi.fn(),
  generatePerPurokYearlyRecommendations: vi.fn(),
  generateAllPuroksMonthlyRecommendations: vi.fn(),
  generateAllPuroksYearlyRecommendations: vi.fn(),
  generateAllRecommendationsService: vi.fn(),
}));

describe("Recommendation Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: {
        purok: "Purok 1",
      },
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    vi.clearAllMocks();
  });

  describe("Overall Monthly Recommendations", () => {
    it("should return overall monthly recommendations", async () => {
      // Arrange
      const recommendations = {
        recommendations: [
          {
            title: "Monitor Usage",
            description: "Increase monitoring.",
          },
        ],
      };

      generateOverallMonthlyRecommendations.mockResolvedValue(
        recommendations
      );

      // Act
      await getOverallMonthlyRecommendations(req, res);

      // Assert
      expect(
        generateOverallMonthlyRecommendations
      ).toHaveBeenCalledTimes(1);

      expect(res.status).toHaveBeenCalledWith(
        200
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: recommendations,
      });
    });

    it.each([
      ["Gemini Error"],
      ["API Error"],
    ])(
      "should return 500 when %s occurs",
      async (message) => {
        // Arrange
        generateOverallMonthlyRecommendations.mockRejectedValue(
          new Error(message)
        );

        // Act
        await getOverallMonthlyRecommendations(
          req,
          res
        );

        // Assert
        expect(res.status).toHaveBeenCalledWith(
          500
        );

        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message,
        });
      }
    );
  });

  describe("Overall Yearly Recommendations", () => {
    it("should return overall yearly recommendations", async () => {
      // Arrange
      const recommendations = {
        recommendations: [],
      };

      generateOverallYearlyRecommendations.mockResolvedValue(
        recommendations
      );

      // Act
      await getOverallYearlyRecommendations(
        req,
        res
      );

      // Assert
      expect(res.status).toHaveBeenCalledWith(
        200
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: recommendations,
      });
    });
  });

  describe("Per Purok Monthly Recommendations", () => {
    it.each([
      ["Purok 1"],
      ["Purok 2"],
      ["Purok 3"],
    ])(
      "should return monthly recommendations for %s",
      async (purok) => {
        // Arrange
        req.params.purok = purok;

        const recommendations = {
          purok,
          recommendations: [],
        };

        generatePerPurokMonthlyRecommendations.mockResolvedValue(
          recommendations
        );

        // Act
        await getPerPurokMonthlyRecommendations(
          req,
          res
        );

        // Assert
        expect(
          generatePerPurokMonthlyRecommendations
        ).toHaveBeenCalledWith(purok);

        expect(res.status).toHaveBeenCalledWith(
          200
        );

        expect(res.json).toHaveBeenCalledWith({
          success: true,
          data: recommendations,
        });
      }
    );
  });

  describe("Per Purok Yearly Recommendations", () => {
    it.each([
      ["Purok 1"],
      ["Purok 2"],
      ["Purok 3"],
    ])(
      "should return yearly recommendations for %s",
      async (purok) => {
        // Arrange
        req.params.purok = purok;

        const recommendations = {
          purok,
          recommendations: [],
        };

        generatePerPurokYearlyRecommendations.mockResolvedValue(
          recommendations
        );

        // Act
        await getPerPurokYearlyRecommendations(
          req,
          res
        );

        // Assert
        expect(
          generatePerPurokYearlyRecommendations
        ).toHaveBeenCalledWith(purok);

        expect(res.status).toHaveBeenCalledWith(
          200
        );
      }
    );
  });

  describe("All Puroks Monthly Recommendations", () => {
    it("should return monthly recommendations of all puroks", async () => {
      // Arrange
      const recommendations = [
        {
          purok: "Purok 1",
          recommendations: [],
        },
      ];

      generateAllPuroksMonthlyRecommendations.mockResolvedValue(
        recommendations
      );

      // Act
      await getAllPuroksMonthlyRecommendations(
        req,
        res
      );

      // Assert
      expect(res.status).toHaveBeenCalledWith(
        200
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: recommendations,
      });
    });
  });

  describe("All Puroks Yearly Recommendations", () => {
    it("should return yearly recommendations of all puroks", async () => {
      // Arrange
      const recommendations = [
        {
          purok: "Purok 1",
          recommendations: [],
        },
      ];

      generateAllPuroksYearlyRecommendations.mockResolvedValue(
        recommendations
      );

      // Act
      await getAllPuroksYearlyRecommendations(
        req,
        res
      );

      // Assert
      expect(res.status).toHaveBeenCalledWith(
        200
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: recommendations,
      });
    });
  });

  describe("Generate All Recommendations", () => {
    it("should return all recommendations", async () => {
      // Arrange
      const recommendations = {
        overallMonthly: {},
        overallYearly: {},
        allPuroksMonthly: [],
        allPuroksYearly: [],
      };

      generateAllRecommendationsService.mockResolvedValue(
        recommendations
      );

      // Act
      await getAllRecommendations(req, res);

      // Assert
      expect(
        generateAllRecommendationsService
      ).toHaveBeenCalledTimes(1);

      expect(res.status).toHaveBeenCalledWith(
        200
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: recommendations,
      });
    });
  });
});