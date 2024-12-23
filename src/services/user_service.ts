import { StatusCodes } from 'http-status-codes';
import { User } from '../shemas/user_schema';
import { handleErrors, RequestError } from '../static/utils';
import { CreateUserDto, UpdateUserDto, User as UserType } from '../types';
import mongoose from 'mongoose';
import { createFavorite, deleteFavorite } from './favorite_service';

export const createUser = async (data: CreateUserDto) => {
  // try {
  const newUser = new User(data);
  await newUser.save();
  const newFav = await createFavorite(newUser._id);
  if (newFav) {
    await updateUser(newUser._id, { favourites_id: newFav._id });
    // newUser.favourites_id = newFav._id;
  }
  // .then(() => console.log('user created'))
  // .catch((err) => {
  //   if (err) {
  //     throw new Error(err);
  //   }
  // });

  return newUser;
  // } catch (err) {
  //   console.error(JSON.stringify(err));
  // }
};

export const findUserByEmail = async (email: string) => {
  if (!email)
    throw new RequestError('Error: email is missing', StatusCodes.BAD_REQUEST);
  const user = await User.findOne({ email }).select('-password');

  if (!user)
    throw new RequestError(
      'Error: can not find user by email',
      StatusCodes.NOT_FOUND,
    );
  return user;
};

export const findUserById = async (id: string) => {
  // try {
  if (!id)
    throw new RequestError('Error: id is missing', StatusCodes.BAD_REQUEST);
  const user = await User.findById(id).select('-password');
  if (!user)
    throw new RequestError(
      'Error: can not find user by id',
      StatusCodes.NOT_FOUND,
    );
  return user;
  // } catch (err: any) {
  //   if (err.name === 'CastError') console.error('CastErr', err.message);
  //   // const error = err as RequestError;
  //   // console.error(JSON.stringify(err) || 'errrror');
  // }
};

export const findAllUsers = async () => {
  const users = await User.find().select('-password');
  return users;
};

export const updateUser = async (
  id: mongoose.Types.ObjectId | string,
  update_user_dto: UpdateUserDto,
) => {
  if (!id) {
    throw new RequestError(
      'Error in updateUser: id is missing',
      StatusCodes.NOT_FOUND,
    );
  }
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new RequestError(
      'Error in updateUser: no user with such id',
      StatusCodes.NOT_FOUND,
    );
  }

  await User.updateOne({ _id: id }, { ...update_user_dto });
  const updated_user = await User.findById(id).select('-password');
  return updated_user;
};

export const deleteUser = async (id: string) => {
  if (!id) {
    throw new RequestError(
      'Error in deleteUser: id is missing',
      StatusCodes.NOT_FOUND,
    );
  }
  const user = await User.findById(id);
  if (!user) {
    throw new RequestError(
      'Error while delete User: no user with such id',
      StatusCodes.NOT_FOUND,
    );
  }
  if (user?.favourites_id) await deleteFavorite(user?.favourites_id);
  await User.findByIdAndDelete(id);
};
