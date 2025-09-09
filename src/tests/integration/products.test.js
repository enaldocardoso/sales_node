import request from 'supertest';
import { app } from '../../index.js';

describe('Products API', () => {
  let authToken;
  let productId;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@email.com',
        password: 'password123'
      });

    authToken = response.body.token;
  });

  test('POST /api/products - Deve criar um produto', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        descricao: 'Produto de Teste',
        valor: 99.99,
        quantidade_estoque: 100
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    
    productId = response.body.id;
  });

  test('GET /api/products - Deve listar produtos', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });
});