import { query, getClient } from '../config/database.js';

export class OrderModel {
  static async create(orderData) {
    const { id_cliente, items } = orderData;
    const client = await getClient();

    try {
      await client.query('BEGIN');

      // Calcular valor total
      let valorTotal = 0;
      for (const item of items) {
        const productResult = await client.query(
          'SELECT valor, quantidade_estoque FROM products WHERE id = $1',
          [item.id_produto]
        );

        if (productResult.rows.length === 0) {
          throw new Error(`Produto ${item.id_produto} não encontrado`);
        }

        const product = productResult.rows[0];
        if (product.quantidade_estoque < item.quantidade) {
          throw new Error(`Produto ${item.id_produto} não possui estoque suficiente`);
        }

        valorTotal += product.valor * item.quantidade;
      }

      // Criar pedido
      const orderResult = await client.query(
        'INSERT INTO orders (id_cliente, valor_total) VALUES ($1, $2) RETURNING id',
        [id_cliente, valorTotal]
      );

      const orderId = orderResult.rows[0].id;

      // Adicionar itens e atualizar estoque
      for (const item of items) {
        await client.query(
          'INSERT INTO order_items (id_pedido, id_produto, valor_produto, quantidade) VALUES ($1, $2, $3, $4)',
          [orderId, item.id_produto, item.valor_produto, item.quantidade]
        );

        await client.query(
          'UPDATE products SET quantidade_estoque = quantidade_estoque - $1 WHERE id = $2',
          [item.quantidade, item.id_produto]
        );
      }

      await client.query('COMMIT');
      return { id: orderId, valor_total: valorTotal };

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async findById(id) {
    const orderResult = await query('SELECT * FROM orders WHERE id = $1', [id]);
    
    if (orderResult.rows.length === 0) {
      return null;
    }

    const order = orderResult.rows[0];
    const itemsResult = await query(
      'SELECT * FROM order_items WHERE id_pedido = $1',
      [id]
    );

    order.items = itemsResult.rows;
    return order;
  }

  static async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const ordersResult = await query(
      'SELECT * FROM orders ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const orders = ordersResult.rows;
    
    for (const order of orders) {
      const itemsResult = await query(
        'SELECT * FROM order_items WHERE id_pedido = $1',
        [order.id]
      );
      order.items = itemsResult.rows;
    }

    return orders;
  }

  static async delete(id) {
    const client = await getClient();

    try {
      await client.query('BEGIN');

      // Verificar se o pedido está pendente
      const orderResult = await client.query(
        'SELECT status FROM orders WHERE id = $1',
        [id]
      );

      if (orderResult.rows.length === 0) {
        throw new Error('Pedido não encontrado');
      }

      if (orderResult.rows[0].status !== 'pendente') {
        throw new Error('Só é possível excluir pedidos com status pendente');
      }

      // Restaurar estoque
      const itemsResult = await client.query(
        'SELECT id_produto, quantidade FROM order_items WHERE id_pedido = $1',
        [id]
      );

      for (const item of itemsResult.rows) {
        await client.query(
          'UPDATE products SET quantidade_estoque = quantidade_estoque + $1 WHERE id = $2',
          [item.quantidade, item.id_produto]
        );
      }

      // Excluir itens e pedido
      await client.query('DELETE FROM order_items WHERE id_pedido = $1', [id]);
      const result = await client.query(
        'DELETE FROM orders WHERE id = $1 RETURNING id',
        [id]
      );

      await client.query('COMMIT');
      return result.rows[0];

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async count() {
    const result = await query('SELECT COUNT(*) FROM orders');
    return parseInt(result.rows[0].count);
  }
}