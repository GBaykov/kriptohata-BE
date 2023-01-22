import express, { Request, Response } from "express";
import { config } from "dotenv";
config();
import sequelize from "./db/db";
// import * as models from "./models/models";
import cors from "cors";
import fileUpload from "express-fileupload";
import router from "./routes";
import errorHendler from "./middleware/ErrorHandlingMiddlewarw";
import path from "path";

//  import models from './models/models';

// import {User, Type, Basket, BascetDevice, Chosen, ChosenDevice, Device, DeviceInfo, Rating} from './models/models';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHendler);

// app.get('/', (req:Request, res: Response) =>{
//     res.status(200).json({message:'WORKING'})

// })

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`server start on PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
