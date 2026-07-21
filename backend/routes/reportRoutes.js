import express from "express";


import {

  generateReport,

  getReports,

  getReport,

  downloadReport,

} from "../controllers/reportController.js";





const router =
express.Router();





/**
 * Generate new report
 * POST /api/reports/generate
 */
router.post(
"/generate",
generateReport
);





/**
 * Get all generated reports
 * GET /api/reports
 */
router.get(
"/",
getReports
);






/**
 * Get report details
 * GET /api/reports/:id
 */
router.get(
"/:id",
getReport
);






/**
 * Download PDF report
 * GET /api/reports/:id/download
 */
router.get(
"/:id/download",
downloadReport
);





export default router;