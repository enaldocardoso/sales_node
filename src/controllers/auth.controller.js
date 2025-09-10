import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config.js';
import { UserModel } from '../models/user.model.js';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: admin@email.com
 *         password:
 *           type: string
 *           format: password
 *           example: senha123
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: admin
 *         email:
 *           type: string
 *           format: email
 *           example: admin@email.com
 *         password:
 *           type: string
 *           format: password
 *           example: senha123
 */

export class AuthController {

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Fazer login
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginRequest'
   *     responses:
   *       200:
   *         description: Login realizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 message:
   *                   type: string
   *                   example: Login realizado com sucesso
   *                 token:
   *                   type: string
   *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   *                 user:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 1
   *                     username:
   *                       type: string
   *                       example: admin
   *                     email:
   *                       type: string
   *                       example: admin@email.com
   *       401:
   *         description: Credenciais inválidas
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */  
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

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Registrar novo usuário
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterRequest'
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Success'
   *       400:
   *         description: Dados inválidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       409:
   *         description: Usuário já existe
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
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

  /**
   * @swagger
   * /auth/me:
   *   get:
   *     summary: Obter perfil do usuário logado
   *     tags: [Auth]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Perfil do usuário
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       401:
   *         $ref: '#/components/responses/UnauthorizedError'
   */
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