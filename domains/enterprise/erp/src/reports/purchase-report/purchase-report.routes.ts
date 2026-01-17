import express from "express";
import { PurchaseReportController } from "./purchase-report.controller";

const router = express.Router();

// Routes are exported without auth middleware
// Middleware is applied at backend route registration for security

router.get("/stats", PurchaseReportController.getPurchaseStats);

export const PurchaseReportRoutes = router;
