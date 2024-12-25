import { Request, Response, NextFunction } from 'express';
import { handleErrors } from '../static/utils';
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
    try {
      const device = req.body;
      const new_device = await createDevice(device);
      res.status(StatusCodes.CREATED).json(new_device);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const devices = await findAllDevices();
      res.status(StatusCodes.OK).json(devices);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const device = await findDevice(id);
      res.status(StatusCodes.OK).json(device);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const device_dto = req.body;
      const updated_device = await updateDevice(id, device_dto);
      res.status(StatusCodes.OK).json(updated_device);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await deleteDevice(id);
      res.status(StatusCodes.NO_CONTENT).json('device successfully deleted');
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }
}

export default new DeviceController();
