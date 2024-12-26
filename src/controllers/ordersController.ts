import { Request, Response, NextFunction } from 'express';

import { handleErrors } from '../static/utils';

import { StatusCodes } from 'http-status-codes';
import {
  createOrder,
  deleteOrder,
  findAllOrders,
  findOrdersByUserId,
} from '../services/order_service';

class OrdersController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const order = req.body;
      const new_order = await createOrder(order);
      console.log(new_order, 18);
      res.status(StatusCodes.CREATED).json(new_order);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await findAllOrders();
      res.status(StatusCodes.OK).json(orders);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const order = await findOrdersByUserId(id);
      res.status(StatusCodes.OK).json(order);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  //   async update(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const { id } = req.params;
  //       const device: Device = req.body;
  //       const index = await DB.devices.findIndex((item) => item.id === id);

  //       device.id === id;
  //       if (!device || index === -1) {
  //         throw new RequestError(
  //           "Error in updat Favorites: no favorite with such user_id",
  //           404
  //         );
  //       }
  //       await DB.devices.splice(index, 1, device);
  //       res.status(201).json(device);
  //     } catch (err) {
  //        handleErrors(err, req, res, next);
  //     }
  //   }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await deleteOrder(id);
      res.status(StatusCodes.NO_CONTENT);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }
}

export default new OrdersController();
