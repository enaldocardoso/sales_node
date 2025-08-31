import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';

const router = Router();

router.post('/orders', OrderController.create);
router.get('/orders/:id', OrderController.findById);
router.get('/orders', OrderController.findAll);
router.delete('/orders/:id', OrderController.delete);

export default router;