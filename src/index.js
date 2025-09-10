import express from 'express';
import { config } from './config/env.config.js';
import clientRoutes from './routes/client.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import authRoutes from './routes/auth.routes.js';
import docsRoutes from './routes/docs.routes.js';

const app = express();
const PORT = config.PORT;

app.use(express.json());

// Rotas públicas
app.use('/api', authRoutes);
app.use('/api', docsRoutes);

// Rotas protegidas
app.use('/api', clientRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Export app for testing
export { app };

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
    console.log(`🩺 Health Check: http://localhost:${PORT}/health`);
  });
}