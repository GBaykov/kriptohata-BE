import mongoose, { ObjectId } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { RequestError } from '../static/utils';
import { Favorite } from '../shemas/favorite_schema';
import { Device } from '../shemas/device_schema';

export const createFavorite = async (user_id: mongoose.Types.ObjectId) => {
  if (!user_id) {
    throw new RequestError(
      'Error: can not create user`s favorites - user_id is missing',
      404,
    );
  }
  const newFavorite = new Favorite({
    user_id,
    items: [],
  });
  await newFavorite.save();
  return newFavorite;
};

export const findFavoriteById = async (id: string) => {
  if (!id)
    throw new RequestError('Error: id is missing', StatusCodes.BAD_REQUEST);
  const favorite = await Favorite.findById(id).populate('items');
  if (!favorite)
    throw new RequestError(
      `Error: can not find favorite by id ${id}`,
      StatusCodes.NOT_FOUND,
    );
  return favorite;
};

export const findFavoriteByUserId = async (user_id: string) => {
  if (!user_id)
    throw new RequestError(
      'Error: user_id is missing',
      StatusCodes.BAD_REQUEST,
    );
  const favorite = await Favorite.find({ user_id: user_id });
  if (!favorite)
    throw new RequestError(
      'Error: can not find user by id',
      StatusCodes.NOT_FOUND,
    );
  return favorite;
};

export const findAllFavorites = async () => {
  return await Favorite.find();
};
export const updateFavoriteById = async (id: string, device_id: ObjectId) => {
  if (!id || !device_id) {
    throw new RequestError(
      'Error in updateFavorite: id or device_id is missing',
      StatusCodes.BAD_REQUEST,
    );
  }

  const users_favorite = await Favorite.findById(id);
  if (!users_favorite) {
    throw new RequestError(
      'Error in updateFavorite: no favorite with such user_id',
      StatusCodes.NOT_FOUND,
    );
  }

  const device = await Device.findOne({ _id: device_id });
  if (!device)
    throw new RequestError(
      'Error in updateFavorite: no device with such device_id',
      StatusCodes.UNPROCESSABLE_ENTITY,
    );

  const item_index = users_favorite.items.findIndex(
    (item) => String(item._id) === String(device_id),
  );

  if (item_index !== -1) {
    users_favorite.items.splice(item_index, 1);
  } else {
    if (device._id) {
      users_favorite?.items.push(device._id);
    }
  }

  await Favorite.updateOne({ _id: id }, users_favorite);

  const favorites = await Favorite.findOne({ _id: id }).populate('items');
  return favorites;
};

export const deleteFavorite = async (id: mongoose.Types.ObjectId | string) => {
  if (!id) {
    throw new RequestError(
      'Error in deleteFavorite: id is missing',
      StatusCodes.NOT_FOUND,
    );
  }
  const favorite = await Favorite.findById(id);
  if (!favorite) {
    throw new RequestError(
      'Error while delete favorite: no favorite with such id',
      StatusCodes.NOT_FOUND,
    );
  }
  await Favorite.findByIdAndDelete(id);
};
