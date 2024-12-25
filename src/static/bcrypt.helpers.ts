import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import Jwt from 'jsonwebtoken';
import { findUserByEmail } from '../services/user_service';
import { RequestError } from './utils';
import { checkHashPassword } from './hash.helpers';
import { config, JWT_SECRET_KEY } from '../common/config';

export const signToken = async (provided_email: string, password: string) => {
  if (!provided_email || !password)
    throw new RequestError(
      'Error:the password or email is missing',
      StatusCodes.BAD_REQUEST,
    );
  const user = await findUserByEmail(provided_email);
  const match = await checkHashPassword(password, user.password);
  if (!match) {
    throw new RequestError(
      'Error: Incorrect password',
      StatusCodes.UNAUTHORIZED,
    );
  }
  const { _id, email } = user;
  if (!JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY is undefined');
  const token = Jwt.sign({ _id, email }, JWT_SECRET_KEY);
  const result = {
    token,
    user: {
      email,
      name: user.name,
      id: user._id,
      tel: user.tel,
      role: user.role,
      favorites_id: user.favourites_id,
    },
  };

  return result;
};
