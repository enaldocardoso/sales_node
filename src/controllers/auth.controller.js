import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config.js';
import { UserModel } from '../models/user.model.js';

export class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validar campos
      if (!email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Email e senha são obrigatórios'
        });
      }

      // Buscar usuário
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Credenciais inválidas'
        });
      }

      // Verificar senha
      const isValidPassword = await UserModel.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          status: 'error',
          message: 'Credenciais inválidas'
        });
      }

      // Gerar token JWT (expira em 1 mês)
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email 
        },
        authConfig.secret,
        { 
          expiresIn: authConfig.expiresIn 
        }
      );

      // Remover password da resposta
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        status: 'success',
        message: 'Login realizado com sucesso',
        token,
        user: userWithoutPassword
      });

    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  }

  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Validar campos
      if (!username || !email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Todos os campos são obrigatórios'
        });
      }

      // Verificar se usuário já existe
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          status: 'error',
          message: 'Usuário já existe'
        });
      }

      // Criar usuário
      const user = await UserModel.create({ username, email, password });

      res.status(201).json({
        status: 'success',
        message: 'Usuário criado com sucesso',
        user
      });

    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  }

  static async me(req, res) {
    try {
      const user = await UserModel.findById(req.userId);
      
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        status: 'success',
        user
      });

    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  }
}