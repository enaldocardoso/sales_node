import request from 'supertest';
import { app } from '../../index.js';

describe('Clients API', () => {
  let authToken;
  let clientId;

  beforeAll(async () => {
    // Login para obter token
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@email.com',
        password: 'password123'
      });

    authToken = response.body.token;
  });

  test('POST /api/clients - Deve criar um cliente válido', async () => {
    const response = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cpf: '12345678901',
        nome: 'João Teste',
        telefone: '11999999999',
        email: 'joao.teste@email.com',
        cep: '01234567',
        municipio: 'São Paulo',
        estado: 'SP',
        endereco: 'Rua Teste',
        numero: '123',
        complemento: 'Apto 1'
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.id).toBeDefined();
    
    clientId = response.body.id;
  });

  test('POST /api/clients - Deve rejeitar CPF inválido', async () => {
    const response = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cpf: '11111111111',
        nome: 'João Teste',
        telefone: '11999999999',
        email: 'joao2@email.com',
        cep: '01234567'
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('CPF inválido');
  });

  test('GET /api/clients - Deve listar clientes', async () => {
    const response = await request(app)
      .get('/api/clients')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  test('GET /api/clients/:id - Deve buscar cliente por ID', async () => {
    const response = await request(app)
      .get(`/api/clients/${clientId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(clientId);
  });
});