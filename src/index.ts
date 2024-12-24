import express, { Request, Response } from 'express';
import { config } from 'dotenv';
config();
// import * as models from "./models/models";
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './routes';
import errorHendler from './middleware/ErrorHandlingMiddlewarw';
import path from 'path';
import { MongoClient } from 'mongodb';
import mongoose, { ConnectOptions } from 'mongoose';
import { handleErrors, RequestError } from './static/utils';

//  import models from './models/models';

// import {User, Type, Basket, BascetDevice, Chosen, ChosenDevice, Device, DeviceInfo, Rating} from './models/models';

const PORT = process.env.PORT || 5000;
const MONGO_DEV_URL = process.env.MONGO_DEV_URL || '';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
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
      .then(() => console.log('Mongo Database connected!'))
      .catch((err) => console.log(err));

    app.listen(PORT, () => {
      console.log(`server start on http://localhost:${PORT}`);
    });
    mongoose.connection.on('error', (err) => {
      handleErrors;
      console.log(err);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
