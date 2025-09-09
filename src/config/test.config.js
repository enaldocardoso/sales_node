import dotenv from 'dotenv';

dotenv.config();

export const testConfig = {
  DB_NAME: process.env.DB_NAME || 'sales_test_db',
  DB_USER: process.env.DB_USER || 'admin',
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  JWT_SECRET: process.env.JWT_SECRET || 'test_secret',
  PORT: process.env.PORT || 3001
};