import express from "express";

import {
  getBillingHistory,
  getCurrentBilling,
} from "../controllers/billingController.js";

const router = express.Router();

router.get("/api/billing/current", getCurrentBilling);
router.get("/api/billing/history", getBillingHistory);

export default router;
