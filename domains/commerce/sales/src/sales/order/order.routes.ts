import { Router } from "express";
import { createOrderController, getAllOrdersController, getOrderByIdController, updateOrderStatusController } from "./order.controller";

const orderRoutes = Router();

// Routes are exported without middleware
// Middleware (moduleGuard, auth, etc.) is applied at backend route registration

orderRoutes.post("/create", createOrderController);
orderRoutes.get("/", getAllOrdersController);
orderRoutes.get("/:id", getOrderByIdController);
orderRoutes.patch("/:id/status", updateOrderStatusController);

export default orderRoutes;
