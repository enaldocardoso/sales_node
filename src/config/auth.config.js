import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '30d'
};