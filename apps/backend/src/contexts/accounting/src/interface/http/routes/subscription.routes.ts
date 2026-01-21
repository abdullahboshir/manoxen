import { Router } from 'express';
import { SubscriptionController } from '../controllers/subscription.controller';
import { authMiddleware as authGuard } from '#app/routes/middleware/auth-middleware';

const router = Router();

router.get('/active', authGuard, SubscriptionController.getActive);
router.post('/activate', authGuard, SubscriptionController.activate);
router.post('/:id/cancel', authGuard, SubscriptionController.cancel);
router.get('/billing-history', authGuard, SubscriptionController.getBillingHistory);

export default router;
