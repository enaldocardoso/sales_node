import { ProductModel } from '../models/product.model.js';

export class ProductController {
  static async create(req, res) {
    try {
      const product = await ProductModel.create(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Produto gerado com sucesso',
        id: product.id
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
      const product = await ProductModel.update(parseInt(id), req.body);
      
      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'Produto não encontrado'
        });
      }

      res.json({
        status: 'success',
        message: 'Produto alterado com sucesso',
        id: product.id
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
      const product = await ProductModel.findById(parseInt(id));
      
      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'Produto não encontrado'
        });
      }

      res.json(product);
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
      
      const products = await ProductModel.findAll(page, limit);
      const total = await ProductModel.count();
      const totalPages = Math.ceil(total / limit);

      res.json({
        data: products,
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
      const product = await ProductModel.delete(parseInt(id));
      
      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'Produto não encontrado'
        });
      }

      res.json({
        status: 'success',
        message: 'Produto excluído com sucesso',
        id: product.id
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }
}