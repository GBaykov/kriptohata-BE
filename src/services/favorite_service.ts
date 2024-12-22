import mongoose, { ObjectId } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { RequestError } from '../static/utils';
import { Favorite } from '../shemas/favorite_schema';
import { Device, DeviceSchema } from '../shemas/device_schema';

export const createFavorite = async (user_id: mongoose.Types.ObjectId) => {
  try {
    if (!user_id) {
      throw new RequestError('Error: can not create user favorites', 404);
    }
    const newFavorite = new Favorite({
      id: new mongoose.Types.ObjectId(),
      user_id,
      items: [],
    });

    Favorite.create(newFavorite);
    // newFavorite.save().then(() => console.log('Saved new user`s favorite'));
    return newFavorite;

    // const user_id = req.body.user_id;
  } catch (err) {
    console.log(err);
  }
};

export const findFavoriteById = async (id: string) => {
  if (!id)
    throw new RequestError('Error: id is missing', StatusCodes.BAD_REQUEST);
  const favorite = await Favorite.findById(id);
  if (!favorite)
    throw new RequestError(
      'Error: can not find user by id',
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
  const users = await Favorite.find();
  return users;
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
  const device = Device.find({ id: device_id });
  if (!device)
    throw new RequestError(
      'Error in updateFavorite: no device with such device_id',
      StatusCodes.UNPROCESSABLE_ENTITY,
    );

  if (users_favorite?.items.findIndex((item) => item.id === device_id) !== -1) {
    const item_index = users_favorite.items.findIndex(
      (item) => item.id === device_id,
    );
    users_favorite.items.splice(item_index, 1);
  } else {
    users_favorite?.items.push(device);
  }
  await Favorite.updateOne({ id: id }, { ...users_favorite });

  const updated_favorite = await Favorite.findById(id);
  return updated_favorite;
};

// export const updateFavoriteByUserId = async (
//   user_id: string,
//   device_id: ObjectId,
// ) => {
//   if (!user_id || !device_id) {
//     throw new RequestError(
//       'Error in updateFavorite: user_id or device_id is missing',
//       StatusCodes.BAD_REQUEST,
//     );
//   }

//   const users_favorite = await Favorite.findOne({ user_id: user_id });
//   if (!users_favorite) {
//     throw new RequestError(
//       'Error in updateFavorite: no favorite with such user_id',
//       StatusCodes.NOT_FOUND,
//     );
//   }
//   const device = Device.find({ id: device_id });
//   if (!device)
//     throw new RequestError(
//       'Error in updateFavorite: no device with such device_id',
//       StatusCodes.UNPROCESSABLE_ENTITY,
//     );

//   if (users_favorite?.items.findIndex((item) => item.id === device_id) !== -1) {
//     const item_index = users_favorite.items.findIndex(
//       (item) => item.id === device_id,
//     );
//     users_favorite.items.splice(item_index, 1);
//   } else {
//     users_favorite?.items.push(device);
//   }
//   await Favorite.updateOne({ user_id: user_id }, { ...users_favorite });

//   const updated_favorite = await Favorite.find({ user_id: user_id });
//   return updated_favorite;
// };

export const deleteFavorite = async (id: string) => {
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
