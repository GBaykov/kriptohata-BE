import { StatusCodes } from 'http-status-codes';
import { User } from '../shemas/user_schema';
import { handleErrors, RequestError } from '../static/utils';
import { CreateUserDto, UpdateUserDto, User as UserType } from '../types';
import mongoose from 'mongoose';
import { createFavorite } from './favorite_service';

export const createUser = async (data: CreateUserDto) => {
  // Должно обрабатываться само благодаря валидации Schema

  // if (!data) {
  //   throw new RequestError(
  //     'Error: The fields for update are required',
  //     StatusCodes.BAD_REQUEST,
  //   );
  // }

  const newUser = new User({ id: new mongoose.Types.ObjectId(), ...data });
  const newFav = await createFavorite(newUser.id);
  if (newFav)
    await User.updateOne({ id: newUser.id }, { favourites_id: newFav.id });
  // newUser.favourites_id = newFav.id;
  // return newUser.save().then(() => console.log('Saved new user'));

  newUser
    .save()
    .then(() => console.log('мяу'))
    .catch((err) => {
      if (err) {
        console.log('ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
        console.log(err.errors);
        //  throw new RequestError(err.status, err.message);
      }
    });
  return newUser;

  // const error = err as RequestError;
  // handleErrors(error, req, res, next);
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
  if (!id)
    throw new RequestError('Error: id is missing', StatusCodes.BAD_REQUEST);
  // const user = await User.findById(id).select('-password');
  const user = await User.findById(id);
  if (!user)
    throw new RequestError(
      'Error: can not find user by id',
      StatusCodes.NOT_FOUND,
    );
  return user;
};

export const findAllUsers = async () => {
  // const users = await User.find().select('-password');
  const users = await User.find();
  return users;
};

export const updateUser = async (
  id: string,
  update_user_dto: UpdateUserDto,
) => {
  if (!id) {
    throw new RequestError(
      'Error in updateUser: id is missing',
      StatusCodes.NOT_FOUND,
    );
  }
  const user = await User.findOne({ id });

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
  await User.findByIdAndDelete(id);
};
