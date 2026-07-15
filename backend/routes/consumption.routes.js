import express from "express";

import {
  getPurokMonthlyPrediction,
  getPurokYearlyPrediction,
  getMonthlyPrediction,
  getYearlyPrediction,

  getConsumptionRankingData,

  getMonthlyHistory,
  getYearlyHistory,
  getPurokMonthlyHistory,
 
  getOverallMonthlyPrediction,
  getOverallYearlyPrediction,
  getPerPurokMonthlyPrediction,

  // getGeminiModels,
} from "../controllers/consumption.controller.js";

const router = express.Router();

// Mathematical Predictions Routes

// Purok Predictions
router.get("/purok/monthly", getPurokMonthlyPrediction);
router.get("/purok/yearly", getPurokYearlyPrediction);

// Overall Predictions
router.get("/monthly", getMonthlyPrediction);
router.get("/yearly", getYearlyPrediction);

router.get("/ranking", getConsumptionRankingData);

// History Routes
router.get("/history/monthly", getMonthlyHistory);
router.get("/history/yearly", getYearlyHistory);
router.get("/history/monthly/purok/:purok", getPurokMonthlyHistory);


// Overall Predictions

// Overall
router.get("/prediction/monthly/overall", getOverallMonthlyPrediction);
router.get("/prediction/yearly/overall", getOverallYearlyPrediction);

// Per Puroks
router.get("/prediction/monthly/purok/:purok", getPerPurokMonthlyPrediction);

// router.get("/models", getGeminiModels);

export default router;