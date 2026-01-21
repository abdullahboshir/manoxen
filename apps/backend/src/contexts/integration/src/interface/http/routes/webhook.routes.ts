import { Router } from 'express';
import { WebhookController } from '../controllers/webhook.controller';
import { authMiddleware as authGuard } from '#app/routes/middleware/auth-middleware';

const router = Router();

router.post('/', authGuard, WebhookController.create);
router.get('/', authGuard, WebhookController.getAll);
router.put('/:id', authGuard, WebhookController.update);
router.delete('/:id', authGuard, WebhookController.delete);

export default router;
