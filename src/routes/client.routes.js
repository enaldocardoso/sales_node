import { Router } from 'express';
import { ClientController } from '../controllers/client.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/clients',authenticateToken, ClientController.create);
router.put('/clients/:id',authenticateToken, ClientController.update);
router.get('/clients/:id',authenticateToken, ClientController.findById);
router.get('/clients',authenticateToken, ClientController.findAll);
router.delete('/clients/:id',authenticateToken, ClientController.delete);

export default router;