import { Router } from 'express';
import { MediaController } from '../controllers/media.controller';
import { authMiddleware as authGuard } from '#app/routes/middleware/auth-middleware';

const router = Router();

router.post('/register', authGuard, MediaController.register);
router.get('/library', authGuard, MediaController.getLibrary);
router.get('/:id', authGuard, MediaController.getById);
router.put('/:id/metadata', authGuard, MediaController.updateMetadata);
router.delete('/:id', authGuard, MediaController.delete);

export default router;
