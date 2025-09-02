import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/products',authenticateToken, ProductController.create);
router.put('/products/:id',authenticateToken, ProductController.update);
router.get('/products/:id',authenticateToken, ProductController.findById);
router.get('/products',authenticateToken, ProductController.findAll);
router.delete('/products/:id',authenticateToken, ProductController.delete);

export default router;