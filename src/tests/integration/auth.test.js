import request from 'supertest';
import { app } from '../../index.js';

describe('Auth API', () => {
  let authToken;

  test('POST /api/auth/register - Deve criar um novo usuário', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
  });

  test('POST /api/auth/login - Deve fazer login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.token).toBeDefined();
    
    authToken = response.body.token;
  });

  test('GET /api/auth/me - Deve retornar dados do usuário', async () => {
    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('test@example.com');
  });
});