import { StatusCodes } from 'http-status-codes';
import { Order } from '../shemas/order_schema';
import { RequestError } from '../static/utils';
import { CreateOrderDto, UpdateOrderDto } from '../types';

export const createOrder = async (order: CreateOrderDto) => {
  const new_order = new Order(order);
  await Order.create(new_order);
  return new_order;
};

export const findOrder = async (id: string) => {
  if (!id)
    throw new RequestError('Error: id is missing', StatusCodes.BAD_REQUEST);
  const order = await Order.findById(id);
  if (!order)
    throw new RequestError(
      'Error: can not find order by id',
      StatusCodes.NOT_FOUND,
    );
  return order;
};

export const findOrdersByUserId = async (user_id: string) => {
  if (!user_id)
    throw new RequestError(
      'Error: user_id is missing',
      StatusCodes.BAD_REQUEST,
    );
  const orders = await Order.find({ user_id });
  if (!orders)
    throw new RequestError(
      'Error: can not find order by id',
      StatusCodes.NOT_FOUND,
    );
  return orders;
};

export const findAllOrders = async () => {
  return await Order.find();
};

export const updateOrder = async (id: string, order_dto: UpdateOrderDto) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new RequestError('Error: order whith such id not found', 404);
  }

  await Order.findByIdAndUpdate(id, { ...order_dto });
  return await Order.findById(id);
};

export const deleteOrder = async (id: string) => {
  if (!id) {
    throw new RequestError(
      'Error in deleteOrder: id is missing',
      StatusCodes.NOT_FOUND,
    );
  }
  const order = await Order.findById(id);
  if (!order) {
    throw new RequestError(
      'Error while delete order: no order with such id',
      StatusCodes.NOT_FOUND,
    );
  }
  await Order.findByIdAndDelete(id);
};
