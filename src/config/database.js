import pg from 'pg';
import { config } from './env.config.js';

const { Pool } = pg;

const pool = new Pool({
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_NAME,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
});

export const query = (text, params) => pool.query(text, params);

export const getClient = () => pool.connect();

export default pool;