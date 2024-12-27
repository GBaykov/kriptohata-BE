import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './routes';
import path from 'path';
import mongoose, { ConnectOptions } from 'mongoose';

import { AUTH_MODE, config } from './common/config';
import checkToken from './services/auth_service';
import morganMiddleware, {
  AppArrorHandler,
  loggingErrors,
} from './middleware/morganLogger';
const { PORT, MONGO_DEV_URL } = config;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(morganMiddleware);
if (AUTH_MODE) app.use(checkToken);
app.use('/api', router);

app.use(AppArrorHandler);

const start = async () => {
  try {
    mongoose
      .connect(MONGO_DEV_URL, {} as ConnectOptions)
      .then(() => {
        console.log('Mongo Database connected!');
        app.listen(PORT, () => {
          console.log(`server start on http://localhost:${PORT}`);
        });
      })
      .catch((err) => loggingErrors(err));

    mongoose.connection.on('error', (err) => {
      loggingErrors(err);
    });
  } catch (err) {
    loggingErrors(err as Error);
  }
};
start();

process.on('uncaughtException', (err) => {
  loggingErrors(err);
  setTimeout(() => process.exit(1), 1000);
});
// throw Error('Oops!');

process.on('unhandledRejection', (err: Error) => {
  loggingErrors(err);
  setTimeout(() => process.exit(1), 1000);
});

// Promise.reject(Error('Oops!'));
