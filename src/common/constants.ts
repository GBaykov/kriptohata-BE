import {
  MONGO_APP_NAME,
  MONGO_DEV_URL,
  MONGO_NAME,
  MONGO_PASSWORD,
  NODE_ENV,
} from './config';
const DEV_URL = MONGO_DEV_URL ? MONGO_DEV_URL : 'mongodb://127.0.0.1:27017/';
const MONGO_PROD_URL = `mongodb+srv://${MONGO_NAME}:${MONGO_PASSWORD}@cluster0.drdn1.mongodb.net/?retryWrites=true&w=majority&appName=${MONGO_APP_NAME}`;

export const MONGO_URL = NODE_ENV === 'development' ? DEV_URL : MONGO_PROD_URL;
