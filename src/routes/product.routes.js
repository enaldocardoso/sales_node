import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';

const router = Router();

router.post('/products', ProductController.create);
router.put('/products/:id', ProductController.update);
router.get('/products/:id', ProductController.findById);
router.get('/products', ProductController.findAll);
router.delete('/products/:id', ProductController.delete);

export default router;