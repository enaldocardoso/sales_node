import { ClientModel } from '../models/client.model.js';

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gerenciamento de clientes
 */
export class ClientController {

  /**
   * @swagger
   * /clients:
   *   post:
   *     summary: Criar novo cliente
   *     tags: [Clients]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Client'
   *     responses:
   *       201:
   *         description: Cliente criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Success'
   *       400:
   *         $ref: '#/components/responses/ValidationError'
   *       401:
   *         $ref: '#/components/responses/UnauthorizedError'
   *       409:
   *         description: CPF ou E-mail já cadastrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async create(req, res) {
    
    try {
      const client = await ClientModel.create(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Cliente gerado com sucesso',
        id: client.id
      });
    } catch (error) {
      // Verificar se é erro de duplicidade
      if (error.message.includes('já cadastrado')) {
        return res.status(409).json({
          status: 'error',
          message: error.message
        });
      }

      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const client = await ClientModel.update(parseInt(id), req.body);
      
      if (!client) {
        return res.status(404).json({
          status: 'error',
          message: 'Cliente não encontrado'
        });
      }

      res.json({
        status: 'success',
        message: 'Cliente alterado com sucesso',
        id: client.id
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;
      const client = await ClientModel.findById(parseInt(id));
      
      if (!client) {
        return res.status(404).json({
          status: 'error',
          message: 'Cliente não encontrado'
        });
      }

      res.json(client);
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  /**
   * @swagger
   * /clients:
   *   get:
   *     summary: Listar todos os clientes
   *     tags: [Clients]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 1
   *         description: Número da página
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 10
   *         description: Número de itens por página
   *     responses:
   *       200:
   *         description: Lista de clientes
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Client'
   *                 pagination:
   *                   type: object
   *                   properties:
   *                     page:
   *                       type: integer
   *                       example: 1
   *                     limit:
   *                       type: integer
   *                       example: 10
   *                     total:
   *                       type: integer
   *                       example: 25
   *                     totalPages:
   *                       type: integer
   *                       example: 3
   *       401:
   *         $ref: '#/components/responses/UnauthorizedError'
   */
  static async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const clients = await ClientModel.findAll(page, limit);
      const total = await ClientModel.count();
      const totalPages = Math.ceil(total / limit);

      res.json({
        data: clients,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const client = await ClientModel.delete(parseInt(id));
      
      if (!client) {
        return res.status(404).json({
          status: 'error',
          message: 'Cliente não encontrado'
        });
      }

      res.json({
        status: 'success',
        message: 'Cliente excluído com sucesso',
        id: client.id
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }
}