import { StatusCodes } from 'http-status-codes';
import { RequestError } from '../static/utils';
import { Callback } from '../shemas/callback_schema';

export const createCallback = async (order: any) => {
  const new_order = new Callback(order);
  await Callback.create(new_order);
  return new_order;
};

export const findCallback = async (id: string) => {
  if (!id)
    throw new RequestError('Error: id is missing', StatusCodes.BAD_REQUEST);
  const callback = await Callback.findById(id);
  if (!callback)
    throw new RequestError(
      `Error: can not find callback by id ${id}`,
      StatusCodes.NOT_FOUND,
    );
  return callback;
};

export const findCallbackByUserId = async (user_id: string) => {
  if (!user_id)
    throw new RequestError(
      'Error: user_id is missing',
      StatusCodes.BAD_REQUEST,
    );
  const callback = await Callback.findOne({ user_id });
  if (!callback)
    throw new RequestError(
      `Error: can not find callback by user_id ${user_id}`,
      StatusCodes.NOT_FOUND,
    );
  return callback;
};

export const findAllCallbacks = async () => {
  return await Callback.find();
};

export const updateCallback = async (id: string, order_dto: any) => {
  const callback = await Callback.findById(id);
  if (!callback)
    throw new RequestError(
      `Error: can not find callback by id ${id}`,
      StatusCodes.NOT_FOUND,
    );

  await Callback.findByIdAndUpdate(id, { ...order_dto });
  return await Callback.findById(id);
};

export const deleteCallback = async (id: string) => {
  if (!id) {
    throw new RequestError(
      'Error in deleteCallback: id is missing',
      StatusCodes.NOT_FOUND,
    );
  }
  const callback = await Callback.findById(id);
  if (!callback)
    throw new RequestError(
      `Error: can not find callback by id ${id}`,
      StatusCodes.NOT_FOUND,
    );
  await Callback.findByIdAndDelete(id);
};
