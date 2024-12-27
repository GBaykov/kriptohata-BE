import { NextFunction, Request, Response } from 'express';
import { User } from '../shemas/user_schema';
import { createUser } from '../services/user_service';
import {
  ADMIN_EMAIL,
  ADMIN_NAME,
  ADMIN_PASSWORD,
  ADMIN_TEL,
} from '../common/config';
import { CreateUserDto } from '../types';
import { RequestError } from './utils';
import { StatusCodes } from 'http-status-codes';

export const addAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isAdmin = await User.findOne({ role: 'Admin' });
  if (!isAdmin) {
    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_TEL) {
      throw new RequestError(
        `Error: An error occurred when creating an admin during database initialization. Data is needed:${ADMIN_NAME},${ADMIN_EMAIL},${ADMIN_PASSWORD},${ADMIN_TEL}`,
        StatusCodes.BAD_REQUEST,
      );
    }
    const admin_dto: CreateUserDto = {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      tel: ADMIN_TEL,
      role: 'Admin',
    };
    await createUser(admin_dto);
    next();
  } else {
    next();
  }
};
