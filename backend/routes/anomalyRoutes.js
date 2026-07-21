import express from "express";

import {
  getOverallMonthlyAnomaly,
  getOverallYearlyAnomaly,
  getPerPurokMonthlyAnomaly,
  getPerPurokYearlyAnomaly,
  getAllPuroksMonthlyAnomaly,
  getAllPuroksYearlyAnomaly,
  generateAllAnomalies,
} from "../controllers/anomaly.controller.js";

const router = express.Router();

// Overall

// Get Monthly Anomaly
router.get("/overall/monthly", getOverallMonthlyAnomaly);

// Get Yearly Anomaly
router.get("/overall/yearly", getOverallYearlyAnomaly);

// Per Purok

// Get Monthly Anomaly
router.get("/purok/:purok/monthly", getPerPurokMonthlyAnomaly);

// Get Yearly Anomaly
router.get("/purok/:purok/yearly", getPerPurokYearlyAnomaly);

// All Puroks

// Get Monthly Anomaly
router.get("/puroks/monthly", getAllPuroksMonthlyAnomaly);

// Get Yearly Anomaly
router.get("/puroks/yearly", getAllPuroksYearlyAnomaly);

// Generate All Anomalies
router.get("/all", generateAllAnomalies);

export default router;