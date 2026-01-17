import express from "express";
import { ProductQAController } from "./product-questions.controller";

const router = express.Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

// Public routes
router.get('/:productId', ProductQAController.getQuestions);

// Protected routes (auth applied at backend)
router.post('/', ProductQAController.createQuestion);
router.patch('/:id', ProductQAController.updateQuestion);
router.patch('/:id/status', ProductQAController.updateStatus);
router.delete('/:id', ProductQAController.deleteQuestion);

export const ProductQARoutes = router;
