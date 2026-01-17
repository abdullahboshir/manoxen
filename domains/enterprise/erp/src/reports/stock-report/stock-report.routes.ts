import express from "express";
import { StockReportController } from "./stock-report.controller";

const router = express.Router();

// Routes are exported without auth middleware
// Middleware is applied at backend route registration for security

router.get("/valuation", StockReportController.getStockValuation);

export const StockReportRoutes = router;
