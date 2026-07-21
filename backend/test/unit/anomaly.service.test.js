import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  getOverallMonthlyAnomaly,
  getOverallYearlyAnomaly,
  getPerPurokMonthlyAnomaly,
  getPerPurokYearlyAnomaly,
  getAllPuroksMonthlyAnomaly,
  getAllPuroksYearlyAnomaly,
  generateAllAnomalies,
} from "../../controllers/anomaly.controller.js";

import {
  generateOverallMonthlyAnomaly,
  generateOverallYearlyAnomaly,
  generatePerPurokMonthlyAnomaly,
  generatePerPurokYearlyAnomaly,
  generateAllPuroksMonthlyAnomaly,
  generateAllPuroksYearlyAnomaly,
  generateAllAnomaliesService,
} from "../../services/anomaly.service.js";

vi.mock("../../services/anomaly.service.js", () => ({
  generateOverallMonthlyAnomaly: vi.fn(),
  generateOverallYearlyAnomaly: vi.fn(),
  generatePerPurokMonthlyAnomaly: vi.fn(),
  generatePerPurokYearlyAnomaly: vi.fn(),
  generateAllPuroksMonthlyAnomaly: vi.fn(),
  generateAllPuroksYearlyAnomaly: vi.fn(),
  generateAllAnomaliesService: vi.fn(),
}));

describe("Anomaly Controller", () => {
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

  describe("Overall Monthly Anomaly", () => {
    it("should return overall monthly anomaly", async () => {
      // Arrange
      const anomaly = {
        summary: "Stable consumption",
        anomalies: [],
      };

      generateOverallMonthlyAnomaly.mockResolvedValue(
        anomaly
      );

      // Act
      await getOverallMonthlyAnomaly(req, res);

      // Assert
      expect(
        generateOverallMonthlyAnomaly
      ).toHaveBeenCalledTimes(1);

      expect(res.status).toHaveBeenCalledWith(
        200
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: anomaly,
      });
    });

    it.each([
      ["Gemini Error"],
      ["API Error"],
    ])(
      "should return 500 when %s occurs",
      async (message) => {
        // Arrange
        generateOverallMonthlyAnomaly.mockRejectedValue(
          new Error(message)
        );

        // Act
        await getOverallMonthlyAnomaly(req, res);

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

  describe("Overall Yearly Anomaly", () => {
    it("should return overall yearly anomaly", async () => {
      // Arrange
      const anomaly = {
        summary: "Stable consumption",
        anomalies: [],
      };

      generateOverallYearlyAnomaly.mockResolvedValue(
        anomaly
      );

      // Act
      await getOverallYearlyAnomaly(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(
        200
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: anomaly,
      });
    });
  });

  describe("Per Purok Monthly Anomaly", () => {
    it.each([
      ["Purok 1"],
      ["Purok 2"],
      ["Purok 3"],
    ])(
      "should return monthly anomaly for %s",
      async (purok) => {
        // Arrange
        req.params.purok = purok;

        const anomaly = {
          purok,
          summary: "Stable consumption",
          anomalies: [],
        };

        generatePerPurokMonthlyAnomaly.mockResolvedValue(
          anomaly
        );

        // Act
        await getPerPurokMonthlyAnomaly(
          req,
          res
        );

        // Assert
        expect(
          generatePerPurokMonthlyAnomaly
        ).toHaveBeenCalledWith(purok);

        expect(res.status).toHaveBeenCalledWith(
          200
        );

        expect(res.json).toHaveBeenCalledWith({
          success: true,
          data: anomaly,
        });
      }
    );
  });

  describe("Per Purok Yearly Anomaly", () => {
    it.each([
      ["Purok 1"],
      ["Purok 2"],
      ["Purok 3"],
    ])(
      "should return yearly anomaly for %s",
      async (purok) => {
        // Arrange
        req.params.purok = purok;

        const anomaly = {
          purok,
          summary: "Stable consumption",
          anomalies: [],
        };

        generatePerPurokYearlyAnomaly.mockResolvedValue(
          anomaly
        );

        // Act
        await getPerPurokYearlyAnomaly(
          req,
          res
        );

        // Assert
        expect(
          generatePerPurokYearlyAnomaly
        ).toHaveBeenCalledWith(purok);

        expect(res.status).toHaveBeenCalledWith(
          200
        );
      }
    );
  });

  describe("All Puroks Monthly Anomaly", () => {
    it("should return monthly anomalies of all puroks", async () => {
      // Arrange
      const anomaly = [
        {
          purok: "Purok 1",
          anomalies: [],
        },
      ];

      generateAllPuroksMonthlyAnomaly.mockResolvedValue(
        anomaly
      );

      // Act
      await getAllPuroksMonthlyAnomaly(
        req,
        res
      );

      // Assert
      expect(res.status).toHaveBeenCalledWith(
        200
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: anomaly,
      });
    });
  });

  describe("All Puroks Yearly Anomaly", () => {
    it("should return yearly anomalies of all puroks", async () => {
      // Arrange
      const anomaly = [
        {
          purok: "Purok 1",
          anomalies: [],
        },
      ];

      generateAllPuroksYearlyAnomaly.mockResolvedValue(
        anomaly
      );

      // Act
      await getAllPuroksYearlyAnomaly(
        req,
        res
      );

      // Assert
      expect(res.status).toHaveBeenCalledWith(
        200
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: anomaly,
      });
    });
  });

  describe("Generate All Anomalies", () => {
    it("should return all anomaly reports", async () => {
      // Arrange
      const anomalies = {
        overallMonthly: {},
        overallYearly: {},
        allPuroksMonthly: [],
        allPuroksYearly: [],
      };

      generateAllAnomaliesService.mockResolvedValue(
        anomalies
      );

      // Act
      await generateAllAnomalies(req, res);

      // Assert
      expect(
        generateAllAnomaliesService
      ).toHaveBeenCalledTimes(1);

      expect(res.status).toHaveBeenCalledWith(
        200
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: anomalies,
      });
    });
  });
});