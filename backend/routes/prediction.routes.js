import express from "express";
import { generateMonthlyPrediction } from "../services/monthlyPrediction.service.js";
import { generateYearlyPrediction } from "../services/yearlyPrediction.service.js";

const router = express.Router();

// GET /api/predictions/monthly
router.get("/monthly", (req, res) => {
  try {
    const prediction = generateMonthlyPrediction();

    res.status(200).json({
      success: true,
      data: prediction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /api/predictions/yearly
router.get("/yearly", (req, res) => {
  try {
    const prediction = generateYearlyPrediction();

    res.status(200).json({
      success: true,
      data: prediction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;