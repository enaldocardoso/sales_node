import { query } from '../config/database.js';

export class ClientModel {
  static async create(clientData) {
    const {
      cpf, nome, telefone, email, cep,
      municipio, estado, endereco, numero, complemento
    } = clientData;

    const result = await query(
      `INSERT INTO clients (cpf, nome, telefone, email, cep, municipio, estado, endereco, numero, complemento)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [cpf, nome, telefone, email, cep, municipio, estado, endereco, numero, complemento]
    );

    return result.rows[0];
  }

  static async update(id, clientData) {
    const {
      cpf, nome, telefone, email, cep,
      municipio, estado, endereco, numero, complemento
    } = clientData;

    const result = await query(
      `UPDATE clients SET cpf=$1, nome=$2, telefone=$3, email=$4, cep=$5, 
       municipio=$6, estado=$7, endereco=$8, numero=$9, complemento=$10
       WHERE id=$11 RETURNING id`,
      [cpf, nome, telefone, email, cep, municipio, estado, endereco, numero, complemento, id]
    );

    return result.rows[0];
  }

  static async findById(id) {
    const result = await query('SELECT * FROM clients WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const result = await query(
      'SELECT * FROM clients ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }

  static async delete(id) {
    const result = await query('DELETE FROM clients WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }

  static async count() {
    const result = await query('SELECT COUNT(*) FROM clients');
    return parseInt(result.rows[0].count);
  }
}