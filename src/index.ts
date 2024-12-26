import express, { Request, Response } from 'express';

// import * as models from "./models/models";
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './routes';
import path from 'path';
import mongoose, { ConnectOptions } from 'mongoose';
import { handleErrors, RequestError } from './static/utils';
import { AUTH_MODE, config } from './common/config';
import checkToken from './services/auth_service';
import morganMiddleware from './middleware/morganLogger';
const { PORT, MONGO_DEV_URL } = config;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(morganMiddleware);
if (AUTH_MODE) app.use(checkToken);
app.use('/api', router);

app.use(handleErrors);

process.on('uncaughtException', (err) => {
  setTimeout(() => process.exit(1), 1000);
  console.error({ status: 500, error: 'Internal Server Error' });
});

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
      .catch((err) => console.log(err));

    mongoose.connection.on('error', (err) => {
      handleErrors;
      console.log(err);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
