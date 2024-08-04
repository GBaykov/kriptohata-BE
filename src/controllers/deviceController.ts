import express, { Router, Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import fileUpload from "express-fileupload";
import path from "path";
import ApiError from "../error/ApiError";
import { Device } from "../types";
import { RequestError } from "../static/utils";
import DB from "../db/db";

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // const {article_number, currency, exists,img,name,price,type }= req.body;

      const device: Device = req.body;
      // const device: Device = {article_number, currency, exists,img,name,price,type, id: uuid() };
      device.id = uuid();

      if (
        !device ||
        !device.article_number ||
        !device.currency ||
        !device.name ||
        !device.type ||
        !device.price
      )
        throw new RequestError("Error: can not create device", 404);
      await DB.devices.push(device);
      res.status(201).json(device);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const devices = await DB.devices;
      if (!devices) throw new Error("NOO devices");

      res.status(200).json(devices);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const devices = await DB.devices.find((item) => item.id === id);
      if (!devices || !id) throw new Error("NOO favorite or id");
      res.status(200).json(devices);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const device: Device = req.body;
      const index = await DB.devices.findIndex((item) => item.id === id);

      device.id === id;
      if (!device || index === -1) {
        throw new RequestError(
          "Error in updat Favorites: no favorite with such user_id",
          404
        );
      }
      await DB.devices.splice(index, 1, device);
      res.status(201).json(device);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const index = await DB.favorites.findIndex((item) => item.user_id === id);
      if (index === -1) {
        throw new RequestError(
          "Error in delete Favorites: no favorite with such user_id",
          404
        );
      }
      await DB.favorites.splice(index, 1);
      res.status(201);
    } catch (err) {
      next(err);
    }
  }
}

export default new DeviceController();
