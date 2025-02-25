import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { User } from '../shemas/user_schema';
import { RequestError } from '../static/utils';
import { CreateUserDto, UpdateUserDto } from '../types';

import { createFavorite, deleteFavorite } from './favorite_service';
import { checkHashPassword, encryptPassword } from '../static/hash.helpers';

export const createUser = async (data: CreateUserDto) => {
  const exist_email = await User.findOne({ email: data.email });
  if (exist_email !== null)
    throw new RequestError(
      'Пользователь с данным email уже существует',
      StatusCodes.BAD_REQUEST,
    );
  const exist_tel = await User.findOne({ tel: data.tel });
  if (exist_tel !== null)
    throw new RequestError(
      'Пользователь с данным номером телефона уже существует',
      StatusCodes.BAD_REQUEST,
    );

  const hash_password = await encryptPassword(data.password);

  const newUser = new User({ ...data, password: hash_password });

  await newUser.save();
  const newFav = await createFavorite(newUser._id);
  if (newFav) {
    await updateUser(newUser._id, { favourites_id: newFav._id });
  }
  return 'The user has been successfully created';
};

export const findUserByEmail = async (email: string) => {
  if (!email)
    throw new RequestError('Error: email is missing', StatusCodes.BAD_REQUEST);
  const user = await User.findOne({ email });

  if (!user)
    throw new RequestError(
      `Error: can not find user by email ${email}`,
      StatusCodes.NOT_FOUND,
    );
  return user;
};

export const findUserById = async (id: string) => {
  if (!id)
    throw new RequestError('Error: id is missing', StatusCodes.BAD_REQUEST);
  const user = await User.findById(id).select('-password');
  if (!user)
    throw new RequestError(
      `Error: can not find user by id ${id}`,
      StatusCodes.NOT_FOUND,
    );
  return user;
};

export const findAllUsers = async () => {
  return await User.find().select('-password');
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
      `Error: can not find user by id ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }
  const { password, new_password, ...rest_user_dto } = update_user_dto;
  if (password && new_password) {
    const match = await checkHashPassword(password, user.password);
    if (!match) {
      throw new RequestError(
        'Error: Incorrect password',
        StatusCodes.UNAUTHORIZED,
      );
    }
    const hash_password = await encryptPassword(new_password);
    await User.updateOne(
      { _id: id },
      { password: hash_password, ...rest_user_dto },
    );
  } else {
    await User.updateOne({ _id: id }, { ...update_user_dto });
  }

  return await User.findById(id).select('-password');
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
      `Error: can not find user by id ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }
  if (user.favourites_id) await deleteFavorite(user.favourites_id);
  await User.findByIdAndDelete(id);
};
