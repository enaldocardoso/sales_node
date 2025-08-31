import { OrderModel } from '../models/order.model.js';

export class OrderController {
  static async create(req, res) {
    try {
      const order = await OrderModel.create(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Pedido de venda gerado com sucesso',
        id: order.id
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
      const order = await OrderModel.findById(parseInt(id));
      
      if (!order) {
        return res.status(404).json({
          status: 'error',
          message: 'Pedido não encontrado'
        });
      }

      res.json(order);
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
      
      const orders = await OrderModel.findAll(page, limit);
      const total = await OrderModel.count();
      const totalPages = Math.ceil(total / limit);

      res.json({
        data: orders,
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
      const order = await OrderModel.delete(parseInt(id));
      
      if (!order) {
        return res.status(404).json({
          status: 'error',
          message: 'Pedido não encontrado'
        });
      }

      res.json({
        status: 'success',
        message: 'Pedido de venda excluído com sucesso',
        id: order.id
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }
}