import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import mongoose, { ConnectOptions } from 'mongoose';
import router from './routes';

import { AUTH_MODE, PORT } from './common/config';
import checkToken from './services/auth_service';
import morganMiddleware, {
  AppArrorHandler,
  loggingErrors,
} from './middleware/morganLogger';
import { addAdmin } from './static/createAdmin';
import { MONGO_URL } from './common/constants';

const app = express();
app.use(addAdmin);
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(morganMiddleware);

if (AUTH_MODE) app.use(checkToken);
app.use('/api', router);

app.use(AppArrorHandler);

export const start = async () => {
  try {
    mongoose
      .connect(MONGO_URL, {} as ConnectOptions)
      .then(() => {
        console.log(`Mongo Database connected!`);
        app.listen(PORT, () => {
          console.log(`Server start on PORT:${PORT}`);
        });
        app.use(addAdmin);
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

process.on('unhandledRejection', (err: Error) => {
  loggingErrors(err);
  setTimeout(() => process.exit(1), 1000);
});
