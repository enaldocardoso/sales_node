import request from 'supertest';
import { app } from '../../index.js';

describe('Orders API', () => {
  let authToken;
  let orderId;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@email.com',
        password: 'password123'
      });

    authToken = response.body.token;
  });

  test('POST /api/orders - Deve criar um pedido', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        id_cliente: 1,
        items: [
          {
            id_produto: 1,
            valor_produto: 100.00,
            quantidade: 2
          }
        ]
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    
    orderId = response.body.id;
  });

  test('POST /api/orders - Deve rejeitar pedido sem estoque', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        id_cliente: 1,
        items: [
          {
            id_produto: 1,
            valor_produto: 100.00,
            quantidade: 1000
          }
        ]
      });

    expect(response.status).toBe(400);
  });
});