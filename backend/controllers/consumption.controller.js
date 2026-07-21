// backend/controllers/consumption.controller.js

import {
  generatePurokMonthlyPrediction,
  generatePurokYearlyPrediction,
  generateMonthlyPrediction,
  generateYearlyPrediction,

  getConsumptionRanking,

  getOverallMonthlyHistory,
  getOverallYearlyHistory,
  getPerPurokMonthlyHistory,
  getPerPurokYearlyHistory,
  getAllPuroksMonthlyHistory as getAllPuroksMonthlyHistoryService,
  getAllPuroksYearlyHistory as getAllPuroksYearlyHistoryService,
  getAllHistoryConsumption,

  generateOverallMonthlyPrediction,
  generateOverallYearlyPrediction,
  generatePerPurokMonthlyPrediction,
  generatePerPurokYearlyPrediction,
  generateAllPuroksMonthlyPrediction,
  generateAllPuroksYearlyPrediction,
  generateAllPredictionsService,

  // listGeminiModels,
} from "../services/consumption.service.js";

// ==========================================
// LOCAL / DETERMINISTIC PREDICTIONS
// ==========================================

// Purok Monthly Prediction
export const getPurokMonthlyPrediction =
  async (req, res) => {
    try {
      const predictions =
        await generatePurokMonthlyPrediction();

      return res.status(200).json({
        success: true,
        data: predictions,
      });
    } catch (error) {
      console.error(
        "Purok monthly prediction error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to generate purok monthly prediction.",
      });
    }
  };

// Purok Yearly Prediction
export const getPurokYearlyPrediction =
  async (req, res) => {
    try {
      const predictions =
        await generatePurokYearlyPrediction();

      return res.status(200).json({
        success: true,
        data: predictions,
      });
    } catch (error) {
      console.error(
        "Purok yearly prediction error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to generate purok yearly prediction.",
      });
    }
  };

// Overall Monthly Prediction
export const getMonthlyPrediction =
  async (req, res) => {
    try {
      const predictions =
        await generateMonthlyPrediction();

      return res.status(200).json({
        success: true,
        data: predictions,
      });
    } catch (error) {
      console.error(
        "Monthly prediction error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to generate monthly prediction.",
      });
    }
  };

// Overall Yearly Prediction
export const getYearlyPrediction =
  async (req, res) => {
    try {
      const predictions =
        await generateYearlyPrediction();

      return res.status(200).json({
        success: true,
        data: predictions,
      });
    } catch (error) {
      console.error(
        "Yearly prediction error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to generate yearly prediction.",
      });
    }
  };

// ==========================================
// CONSUMPTION RANKING
// ==========================================

export const getConsumptionRankingData =
  async (req, res) => {
    try {
      const ranking =
        await getConsumptionRanking();

      return res.status(200).json({
        success: true,
        data: ranking,
      });
    } catch (error) {
      console.error(
        "Consumption ranking error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to retrieve purok consumption ranking.",
      });
    }
  };

// ==========================================
// HISTORY
// ==========================================

// Overall Monthly History
export const getMonthlyHistory =
  async (req, res) => {
    try {
      const history =
        await getOverallMonthlyHistory();

      return res.status(200).json({
        success: true,
        data: history,
      });
    } catch (error) {
      console.error(
        "Monthly history error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to retrieve monthly history.",
      });
    }
  };

// Overall Yearly History
export const getYearlyHistory =
  async (req, res) => {
    try {
      const history =
        await getOverallYearlyHistory();

      return res.status(200).json({
        success: true,
        data: history,
      });
    } catch (error) {
      console.error(
        "Yearly history error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to retrieve yearly history.",
      });
    }
  };

// Per Purok Monthly History
export const getPurokMonthlyHistory =
  async (req, res) => {
    try {
      const { purok } = req.params;

      if (!purok) {
        return res.status(400).json({
          success: false,
          message:
            "Purok parameter is required.",
        });
      }

      const history =
        await getPerPurokMonthlyHistory(
          purok
        );

      return res.status(200).json({
        success: true,
        data: history,
      });
    } catch (error) {
      console.error(
        "Purok monthly history error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to retrieve purok monthly history.",
      });
    }
  };

// Per Purok Yearly History
export const getPurokYearlyHistory =
  async (req, res) => {
    try {
      const { purok } = req.params;

      if (!purok) {
        return res.status(400).json({
          success: false,
          message:
            "Purok parameter is required.",
        });
      }

      const history =
        await getPerPurokYearlyHistory(
          purok
        );

      return res.status(200).json({
        success: true,
        data: history,
      });
    } catch (error) {
      console.error(
        "Purok yearly history error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to retrieve purok yearly history.",
      });
    }
  };

// All Puroks Monthly History
export const getAllPuroksMonthlyHistory =
  async (req, res) => {
    try {
      const history =
        await getAllPuroksMonthlyHistoryService();

      return res.status(200).json({
        success: true,
        data: history,
      });
    } catch (error) {
      console.error(
        "All puroks monthly history error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to retrieve all puroks monthly history.",
      });
    }
  };

// All Puroks Yearly History
export const getAllPuroksYearlyHistory =
  async (req, res) => {
    try {
      const history =
        await getAllPuroksYearlyHistoryService();

      return res.status(200).json({
        success: true,
        data: history,
      });
    } catch (error) {
      console.error(
        "All puroks yearly history error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to retrieve all puroks yearly history.",
      });
    }
  };

export const generateAllHistoryConsumption =
  async (req, res) => {
    try {
      const history =
        await getAllHistoryConsumption();

      const yearlyHistory = Array.isArray(
        history?.overallYearly
      )
        ? history.overallYearly
        : [];

      const overallConsumption =
        yearlyHistory.reduce((total, item) => {
          const consumption = Number(
            item?.consumption ?? 0
          );

          return (
            total +
            (Number.isFinite(consumption)
              ? consumption
              : 0)
          );
        }, 0);

      return res.status(200).json({
        success: true,
        data: {
          overallConsumption:
            Number(
              overallConsumption.toFixed(2)
            ),
          recordCount: yearlyHistory.length,
          yearlyHistory,
        },
      });
    } catch (error) {
      console.error(
        "All history consumption error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to retrieve overall consumption history.",
      });
    }
  };
// ==========================================
// GEMINI AI PREDICTIONS
// ==========================================

// Overall Monthly AI Prediction
export const getOverallMonthlyPrediction =
  async (req, res) => {
    try {
      const prediction =
        await generateOverallMonthlyPrediction();

      return res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      console.error(
        "Overall monthly AI prediction error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to generate overall monthly AI prediction.",
      });
    }
  };

// Overall Yearly AI Prediction
export const getOverallYearlyPrediction =
  async (req, res) => {
    try {
      const prediction =
        await generateOverallYearlyPrediction();

      return res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      console.error(
        "Overall yearly AI prediction error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to generate overall yearly AI prediction.",
      });
    }
  };

// Per Purok Monthly AI Prediction
export const getPerPurokMonthlyPrediction =
  async (req, res) => {
    try {
      const { purok } = req.params;

      if (!purok) {
        return res.status(400).json({
          success: false,
          message:
            "Purok parameter is required.",
        });
      }

      const prediction =
        await generatePerPurokMonthlyPrediction(
          purok
        );

      return res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      console.error(
        "Per purok monthly AI prediction error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to generate purok monthly AI prediction.",
      });
    }
  };

// Per Purok Yearly AI Prediction
export const getPerPurokYearlyPrediction =
  async (req, res) => {
    try {
      const { purok } = req.params;

      if (!purok) {
        return res.status(400).json({
          success: false,
          message:
            "Purok parameter is required.",
        });
      }

      const prediction =
        await generatePerPurokYearlyPrediction(
          purok
        );

      return res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      console.error(
        "Per purok yearly AI prediction error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to generate purok yearly AI prediction.",
      });
    }
  };

// All Puroks Monthly AI Prediction
export const getAllPuroksMonthlyPrediction =
  async (req, res) => {
    try {
      const prediction =
        await generateAllPuroksMonthlyPrediction();

      return res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      console.error(
        "All puroks monthly AI prediction error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to generate all puroks monthly AI prediction.",
      });
    }
  };

// All Puroks Yearly AI Prediction
export const getAllPuroksYearlyPrediction =
  async (req, res) => {
    try {
      const prediction =
        await generateAllPuroksYearlyPrediction();

      return res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      console.error(
        "All puroks yearly AI prediction error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to generate all puroks yearly AI prediction.",
      });
    }
  };

// Generate All AI Predictions
export const generateAllPredictions =
  async (req, res) => {
    try {
      const predictions =
        await generateAllPredictionsService();

      return res.status(200).json({
        success: true,
        data: predictions,
      });
    } catch (error) {
      console.error(
        "Generate all AI predictions error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to generate all AI predictions.",
      });
    }
  };

// ==========================================
// OPTIONAL: CHECK GEMINI MODELS
// ==========================================

// export const getGeminiModels =
//   async (req, res) => {
//     try {
//       const models =
//         await listGeminiModels();
//
//       return res.status(200).json({
//         success: true,
//         count: models.length,
//         data: models,
//       });
//     } catch (error) {
//       console.error(
//         "Gemini models error:",
//         error
//       );
//
//       return res.status(500).json({
//         success: false,
//         message:
//           error.message ||
//           "Failed to retrieve Gemini models.",
//       });
//     }
//   };