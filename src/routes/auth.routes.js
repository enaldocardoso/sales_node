import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rotas públicas
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// Rota protegida
router.get('/auth/me', authenticateToken, AuthController.me);

export default router;