import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Token de acesso necessário'
    });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: 'error',
        message: 'Token inválido ou expirado'
      });
    }

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  });
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (!err) {
        req.userId = decoded.id;
        req.userEmail = decoded.email;
      }
    });
  }

  next();
};