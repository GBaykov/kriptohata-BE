import dotenv from 'dotenv';
import path from 'path';
// import { config as dotenv_config } from 'dotenv';
// dotenv_config();

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_DEV_URL: process.env.MONGO_DEV_URL || 'mongodb://127.0.0.1:27017/',
  MONGO_PROD_URL: process.env.MONGO_PROD_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
export const { JWT_SECRET_KEY, AUTH_MODE } = process.env;
