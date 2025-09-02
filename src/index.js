import express from 'express';
import { config } from './config/env.config.js';
import clientRoutes from './routes/client.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
const PORT = config.PORT;

app.use(express.json());

// Rotas públicas
app.use('/api', authRoutes);

// Rotas protegidas
app.use('/api', clientRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});