import express from "express";

import {
  getMonthlyPrediction,
  getYearlyPrediction,
} from "../controllers/consumption.controller.js";

const router = express.Router();

router.get(
  "/monthly",
  getMonthlyPrediction
);

router.get(
  "/yearly",
  getYearlyPrediction
);

export default router;