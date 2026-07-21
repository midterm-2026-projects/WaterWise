import express from "express";

import {
  // Local / Deterministic Predictions
  getPurokMonthlyPrediction,
  getPurokYearlyPrediction,
  getMonthlyPrediction,
  getYearlyPrediction,

  // Ranking
  getConsumptionRankingData,

  // History
  getMonthlyHistory,
  getYearlyHistory,
  getPurokMonthlyHistory,
  getPurokYearlyHistory,
  getAllPuroksMonthlyHistory,
  getAllPuroksYearlyHistory,
  generateAllHistoryConsumption,

  // AI Predictions
  getOverallMonthlyPrediction,
  getOverallYearlyPrediction,
  getPerPurokMonthlyPrediction,
  getPerPurokYearlyPrediction,
  getAllPuroksMonthlyPrediction,
  getAllPuroksYearlyPrediction,
  generateAllPredictions,

  // getGeminiModels,
} from "../controllers/consumption.controller.js";

const router = express.Router();

// ==========================================
// LOCAL / DETERMINISTIC PREDICTIONS
// ==========================================

// Purok
router.get(
  "/purok/monthly",
  getPurokMonthlyPrediction
);

router.get(
  "/purok/yearly",
  getPurokYearlyPrediction
);

// Overall
router.get(
  "/monthly",
  getMonthlyPrediction
);

router.get(
  "/yearly",
  getYearlyPrediction
);

// Ranking
router.get(
  "/ranking",
  getConsumptionRankingData
);

// ==========================================
// HISTORY
// ==========================================

// Overall Consumption History
router.get(
  "/history/overall",
  generateAllHistoryConsumption
);

// Monthly History
router.get(
  "/history/monthly",
  getMonthlyHistory
);

// Yearly History
router.get(
  "/history/yearly",
  getYearlyHistory
);

// All Puroks Monthly History
router.get(
  "/history/monthly/all-puroks",
  getAllPuroksMonthlyHistory
);

// All Puroks Yearly History
router.get(
  "/history/yearly/all-puroks",
  getAllPuroksYearlyHistory
);

// Per Purok Monthly History
router.get(
  "/history/monthly/purok/:purok",
  getPurokMonthlyHistory
);

// Per Purok Yearly History
router.get(
  "/history/yearly/purok/:purok",
  getPurokYearlyHistory
);

// ==========================================
// GEMINI AI PREDICTIONS
// ==========================================

// Overall Monthly Prediction
router.get(
  "/prediction/monthly/overall",
  getOverallMonthlyPrediction
);

// Overall Yearly Prediction
router.get(
  "/prediction/yearly/overall",
  getOverallYearlyPrediction
);

// All Puroks Monthly Prediction
router.get(
  "/prediction/monthly/all-puroks",
  getAllPuroksMonthlyPrediction
);

// All Puroks Yearly Prediction
router.get(
  "/prediction/yearly/all-puroks",
  getAllPuroksYearlyPrediction
);

// Per Purok Monthly Prediction
router.get(
  "/prediction/monthly/purok/:purok",
  getPerPurokMonthlyPrediction
);

// Per Purok Yearly Prediction
router.get(
  "/prediction/yearly/purok/:purok",
  getPerPurokYearlyPrediction
);

// Generate All Predictions
router.get(
  "/prediction/generate-all",
  generateAllPredictions
);

// ==========================================
// OPTIONAL
// ==========================================

// router.get("/models", getGeminiModels);

export default router;