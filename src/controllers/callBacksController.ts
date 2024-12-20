import express, { Router, Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import fileUpload from "express-fileupload";
import path from "path";
import ApiError from "../error/ApiError";
import { CallBack, Device } from "../types";
import { RequestError } from "../static/utils";
import DB from "../db/db";

class CallBacksController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const callback: CallBack = req.body;
      callback.id = uuid();
      if (!callback.id || !callback.name || !callback.tel) {
        throw new RequestError("Error: can not create callback", 404);
      }
      await DB.callbacks?.push(callback);
      res.status(201).json(callback);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const callbacks = await DB.callbacks;
      if (!callbacks) throw new Error("NOO callbacks");

      res.status(200).json(callbacks);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const callback = await DB.callbacks?.find((item) => item.id === id);
      if (!callback || !id) throw new Error("NOO callback or id");
      res.status(200).json(callback);
    } catch (err) {
      next(err);
    }
  }

  //   async delete(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const { id } = req.params;
  //       const index = await DB.favorites.findIndex((item) => item.user_id === id);
  //       if (index === -1) {
  //         throw new RequestError(
  //           "Error in delete Favorites: no favorite with such user_id",
  //           404
  //         );
  //       }
  //       await DB.favorites.splice(index, 1);
  //       res.status(201);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }

  async deleteAll(req: Request, res: Response, next: NextFunction) {
    try {
      await DB.callbacks.splice(0, DB.callbacks.length);
      res.status(201);
    } catch (err) {
      next(err);
    }
  }
}

export default new CallBacksController();
