import { query } from '../config/database.js';

export class ProductModel {
  static async create(productData) {
    const { descricao, valor, quantidade_estoque } = productData;

    const result = await query(
      'INSERT INTO products (descricao, valor, quantidade_estoque) VALUES ($1, $2, $3) RETURNING id',
      [descricao, valor, quantidade_estoque]
    );

    return result.rows[0];
  }

  static async update(id, productData) {
    const { descricao, valor, quantidade_estoque } = productData;

    const result = await query(
      'UPDATE products SET descricao=$1, valor=$2, quantidade_estoque=$3 WHERE id=$4 RETURNING id',
      [descricao, valor, quantidade_estoque, id]
    );

    return result.rows[0];
  }

  static async findById(id) {
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const result = await query(
      'SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }

  static async delete(id) {
    const result = await query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }

  static async updateStock(id, quantidade) {
    const result = await query(
      'UPDATE products SET quantidade_estoque = quantidade_estoque + $1 WHERE id = $2 RETURNING *',
      [quantidade, id]
    );
    return result.rows[0];
  }

  static async count() {
    const result = await query('SELECT COUNT(*) FROM products');
    return parseInt(result.rows[0].count);
  }
}