import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { handleErrors } from '../static/utils';
import {
  createCallback,
  deleteAllCallbacks,
  deleteCallback,
  findAllCallbacks,
  findCallback,
} from '../services/callback_service';

class CallBacksController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const callback_dto = req.body;

      const callback = await createCallback(callback_dto);
      res.status(StatusCodes.CREATED).json(callback);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const callbacks = await findAllCallbacks();
      if (!callbacks) throw new Error('NOO callbacks');

      res.status(StatusCodes.OK).json(callbacks);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const callback = await findCallback(id);
      res.status(StatusCodes.OK).json(callback);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await deleteCallback(id);
      res.status(StatusCodes.NO_CONTENT);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  async deleteAll(req: Request, res: Response, next: NextFunction) {
    try {
      await deleteAllCallbacks();
      res.status(StatusCodes.NO_CONTENT);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }
}

export default new CallBacksController();
