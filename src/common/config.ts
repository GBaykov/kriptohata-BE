import dotenv from 'dotenv';
import path from 'path';

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

export const {
  JWT_SECRET_KEY,
  AUTH_MODE,
  LOG_LVL,
  NODE_ENV,
  ADMIN_NAME,
  ADMIN_PASSWORD,
  ADMIN_TEL,
  ADMIN_EMAIL,
  PORT,
  MONGO_DEV_URL,
  MONGO_NAME,
  MONGO_PASSWORD,
  MONGO_APP_NAME,
} = process.env;
