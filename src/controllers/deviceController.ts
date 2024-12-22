import express, { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import fileUpload from 'express-fileupload';
import path from 'path';
import ApiError from '../error/ApiError';
import { Device as DeviceType } from '../types';
import { RequestError } from '../static/utils';
import DB from '../db/db';
import { Device } from '../shemas/device_schema';
import { StatusCodes } from 'http-status-codes';
import {
  createDevice,
  deleteDevice,
  findAllDevices,
  findDevice,
  updateDevice,
} from '../services/device_service';

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    const device = req.body;
    const new_device = await createDevice(device);
    res.status(StatusCodes.CREATED).json(new_device);
    // try {
    //   // const {article_number, currency, exists,img,name,price,type }= req.body;

    //   const device = req.body;
    //   // const device: Device = {article_number, currency, exists,img,name,price,type, id: uuid() };
    //   // device.id = uuid();

    //   if (
    //     !device ||
    //     !device.article_number ||
    //     !device.currency ||
    //     !device.name ||
    //     !device.type ||
    //     !device.price
    //   )
    //     throw new RequestError('Error: can not create device', 404);
    //   const new_device = new Device(device);
    //   await Device.create(new_device);
    //   res.status(201).json(new_device);
    // } catch (err) {
    //   next(err);
    // }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const devices = await findAllDevices();
      res.status(StatusCodes.OK).json(devices);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const device = await findDevice(id);
      res.status(StatusCodes.OK).json(device);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const device_dto = req.body;
    const updated_device = await updateDevice(id, device_dto);
    res.status(StatusCodes.OK).json(updated_device);
    // try {
    //   const { id } = req.params;
    //   const device_dto = req.body;
    //   if (!device_dto) {
    //     throw new RequestError(
    //       'Error: Device whith such id not found',
    //       StatusCodes.BAD_REQUEST,
    //     );
    //   }
    //   const device = await Device.findById(id);
    //   if (!device) {
    //     throw new RequestError('Error: Device whith such id not found', 404);
    //   }

    //   await Device.findByIdAndUpdate(id, { ...device_dto });
    //   const updated_device = await Device.findById(id);
    //   res.status(201).json(updated_device);
    // } catch (err) {
    //   next(err);
    // }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    await deleteDevice(id);
    res.status(StatusCodes.NO_CONTENT).json('device successfully deleted');
    // try {
    //   const { id } = req.params;
    //   const device = await Device.findById(id);
    //   if (!device) {
    //     throw new RequestError(
    //       'Error: Device whist such id not found',
    //       StatusCodes.NOT_FOUND,
    //     );
    //   }
    //   await Device.findByIdAndDelete(id);
    //   res.status(StatusCodes.NO_CONTENT);
    // } catch (err) {
    //   next(err);
    // }
  }
}

export default new DeviceController();
