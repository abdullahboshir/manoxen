import express from "express";
import { ProductReviewController } from "./product-reviews.controller";

const router = express.Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

// Public routes
router.get('/:productId', ProductReviewController.getReviewsForProduct);

// Protected routes (auth applied at backend)
router.post('/', ProductReviewController.createReview);
router.get('/', ProductReviewController.getProductReviews);
router.patch('/:id', ProductReviewController.updateReview);
router.post('/:id/reply', ProductReviewController.replyToReview);
router.delete('/:id', ProductReviewController.deleteReview);

export const ProductReviewRoutes = router;
