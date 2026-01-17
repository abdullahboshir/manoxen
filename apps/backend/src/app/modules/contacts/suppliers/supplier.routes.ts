import { Router } from "express";
import { getAllSuppliersController } from "./supplier.controller";

const router = Router();

router.get("/", getAllSuppliersController);

export const supplierRoutes = router;
















