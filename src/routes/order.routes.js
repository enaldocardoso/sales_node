import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/orders',authenticateToken, OrderController.create);
router.get('/orders/:id',authenticateToken, OrderController.findById);
router.get('/orders',authenticateToken, OrderController.findAll);
router.delete('/orders/:id',authenticateToken, OrderController.delete);

export default router;