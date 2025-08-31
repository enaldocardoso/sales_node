import { Router } from 'express';
import { ClientController } from '../controllers/client.controller.js';

const router = Router();

router.post('/clients', ClientController.create);
router.put('/clients/:id', ClientController.update);
router.get('/clients/:id', ClientController.findById);
router.get('/clients', ClientController.findAll);
router.delete('/clients/:id', ClientController.delete);

export default router;