import { ClientModel } from '../models/client.model.js';

export class ClientController {
  static async create(req, res) {
    try {
      const client = await ClientModel.create(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Cliente gerado com sucesso',
        id: client.id
      });
    } catch (error) {
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