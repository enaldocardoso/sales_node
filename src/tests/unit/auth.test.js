import jwt from 'jsonwebtoken';
import { authConfig } from '../../config/auth.config.js';
import { authenticateToken } from '../../middlewares/auth.middleware.js';

// Mock do Express
const mockRequest = (headers = {}) => ({
  headers
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe('Auth Middleware', () => {
  test('Deve rejeitar requisição sem token', () => {
    const req = mockRequest();
    const res = mockResponse();

    authenticateToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Token de acesso necessário'
    });
  });

  test('Deve rejeitar token inválido', () => {
    const req = mockRequest({
      authorization: 'Bearer token_invalido'
    });
    const res = mockResponse();

    authenticateToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('Deve aceitar token válido', () => {
    const token = jwt.sign({ id: 1, email: 'test@email.com' }, authConfig.secret);
    const req = mockRequest({
      authorization: `Bearer ${token}`
    });
    const res = mockResponse();

    authenticateToken(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(req.userId).toBe(1);
  });
});