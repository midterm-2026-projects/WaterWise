import express from "express";

import {
  getPurokMonthlyPrediction,
  getPurokYearlyPrediction,
  getMonthlyPrediction,
  getYearlyPrediction,
} from "../controllers/prediction.controller.js";

const router = express.Router();

// Purok Predictions
router.get(
  "/purok/monthly",
  getPurokMonthlyPrediction
);

router.get(
  "/purok/yearly",
  getPurokYearlyPrediction
);

// Overall Predictions
router.get(
  "/monthly",
  getMonthlyPrediction
);

router.get(
  "/yearly",
  getYearlyPrediction
);

export default router;