import express from "express";
import { SalesReportController } from "./sales-report.controller";

const router = express.Router();

// Routes are exported without auth middleware
// Middleware is applied at backend route registration for security

router.get("/stats", SalesReportController.getSalesStats);

export const SalesReportRoutes = router;
