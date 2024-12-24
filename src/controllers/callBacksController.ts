import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';

import { handleErrors, RequestError } from '../static/utils';
import {
  createCallback,
  deleteAllCallbacks,
  deleteCallback,
  findAllCallbacks,
  findCallback,
} from '../services/callback_service';
import { StatusCodes } from 'http-status-codes';

class CallBacksController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const callback_dto = req.body;

      const callback = await createCallback(callback_dto);
      res.status(StatusCodes.CREATED).json(callback);
    } catch (err: unknown) {
      handleErrors;
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const callbacks = await findAllCallbacks();
      if (!callbacks) throw new Error('NOO callbacks');

      res.status(StatusCodes.OK).json(callbacks);
    } catch (err: unknown) {
      handleErrors;
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const callback = await findCallback(id);
      res.status(StatusCodes.OK).json(callback);
    } catch (err: unknown) {
      handleErrors;
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await deleteCallback(id);
      res.status(StatusCodes.NO_CONTENT);
    } catch (err: unknown) {
      handleErrors;
    }
  }

  async deleteAll(req: Request, res: Response, next: NextFunction) {
    try {
      await deleteAllCallbacks();
      res.status(StatusCodes.NO_CONTENT);
    } catch (err: unknown) {
      handleErrors;
    }
  }
}

export default new CallBacksController();
