import express, { Router, Request, Response, NextFunction } from 'express';

import ApiError from '../error/ApiError';

import { RequestError } from '../static/utils';

import { StatusCodes } from 'http-status-codes';
import {
  createOrder,
  deleteOrder,
  findAllOrders,
  findOrder,
  findOrderByUserId,
} from '../services/order_service';

class OrdersController {
  async create(req: Request, res: Response, next: NextFunction) {
    // try {
    //   const date = new Date();
    const order = req.body;
    //   order.id = uuid();
    //   order.date = date.toString();
    //   if (!order || !order.user_name || !order.user_tel || !order.items) {
    //     throw new RequestError("Error: can not create order", 404);
    //   }
    const new_order = createOrder(order);
    res.status(StatusCodes.CREATED).json(new_order);
    // } catch (err) {
    //   next(err);
    // }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const orders = await findAllOrders();
    res.status(StatusCodes.OK).json(orders);
    // try {
    //   const orders = await DB.orders;
    //   if (!orders) throw new Error('NOO orders');

    //   res.status(200).json(orders);
    // } catch (err) {
    //   next(err);
    // }
  }

  async getOneByUserId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const order = findOrderByUserId(id);
    res.status(StatusCodes.OK).json(order);
    // try {
    //   const { id } = req.params;
    //   const order = await DB.orders.filter((item) => item.user_id === id);
    //   if (!order || !id) throw new Error('NOO favorite or id');
    //   res.status(200).json(order);
    // } catch (err) {
    //   next(err);
    // }
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
  //       next(err);
  //     }
  //   }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    await deleteOrder(id);
    res.status(StatusCodes.NO_CONTENT);
    // try {
    //   const { id } = req.params;
    //   const index = await DB.orders.findIndex((item) => item.id === id);
    //   if (index === -1) {
    //     throw new RequestError(
    //       'Error in delete orders: no order with such id',
    //       404,
    //     );
    //   }
    //   await DB.orders.splice(index, 1);
    //   res.status(201);
    // } catch (err) {
    //   next(err);
    // }
  }
}

export default new OrdersController();
