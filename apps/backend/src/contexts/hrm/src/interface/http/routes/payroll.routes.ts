import { Router } from "express";
import { PayrollController } from "../controllers/payroll.controller";

const router = Router();

router.post("/", PayrollController.createPayroll);
router.get("/", PayrollController.getAllPayroll);

export const PayrollRoutes = router;
