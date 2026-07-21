import express from "express";

import { listConsumptionHistory } from "../controllers/consumptionHistory.controller.js";
import { authenticateConsumptionHistory } from "../middleware/consumptionHistoryAuth.middleware.js";

const router = express.Router();

router.get("/", authenticateConsumptionHistory, listConsumptionHistory);

export default router;
