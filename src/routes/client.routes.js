import { Router } from 'express';
import { ClientController } from '../controllers/client.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { validateClient } from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/clients', authenticateToken, validateClient, ClientController.create);
router.put('/clients/:id', authenticateToken, validateClient, ClientController.update);
router.get('/clients/:id', authenticateToken, ClientController.findById);
router.get('/clients', authenticateToken, ClientController.findAll);
router.delete('/clients/:id', authenticateToken, ClientController.delete);

export default router;