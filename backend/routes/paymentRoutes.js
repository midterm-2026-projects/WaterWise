import express from "express";
import {
  createPayment,
  getBillingPayment,
  listPayments,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/", listPayments);
router.get("/billing/:billingId", getBillingPayment);
router.post("/", createPayment);

export default router;
