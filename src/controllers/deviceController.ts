import express, { Router, Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import fileUpload from "express-fileupload";
import path from "path";
import { Device, DeviceInfo } from "../models/models";
import ApiError from "../error/ApiError";
import { IDeviceInfo, RequestDevice } from "../types";

export interface MulterFile {
  key: string; // Available using `S3`.
  path: string; // Available using `DiskStorage`.
  mimetype: string;
  originalname: string;
  size: number;
  img: any;
}

class DeviceController {
  async create(
    req: Request & { files: any },
    res: Response,
    next: NextFunction
  ) {
    try {
      const data: RequestDevice = req.body;
      let { name, price, exists, info, typeId } = data;
      const { img } = req.files;
      const fileName = uuid() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        id: 5,
        name,
        price,
        exists,
        typeId,
        img: fileName,
      });

      if (info) {
        const information: Array<IDeviceInfo> = JSON.parse(info);
        information.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (e) {
      const error = e as Error;
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req: Request, res: Response) {
    const { typeId } = req.query;
    let devices;
    if (!typeId) {
      devices = Device.findAll();
    }
    devices = Device.findAll({ where: { typeId } });
    return res.json(devices);
  }

  async getOne(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}

  async update(req: Request, res: Response) {}
}

export default new DeviceController();
