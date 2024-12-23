import { NextFunction, Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  updateUser,
} from '../services/user_service';
import { User as UserType } from '../types';
import { User } from '../shemas/user_schema';
import { handleErrors, RequestError } from '../static/utils';
import { StatusCodes } from 'http-status-codes';

class UserController {
  static toResponse(user: UserType) {
    const { password, ...data } = user;
    return data;
  }
  // async registration(req: Request, res: Response, next: NextFunction) {
  //   {
  //     try {
  //       const { name, email, password, tel, role } = req.body;
  //       const newUser = await createMongoUser({
  //         name,
  //         email,
  //         password,
  //         tel,
  //         role,
  //       });
  //       return res.status(200).json(newUser);
  //     } catch (error) {
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     }
  //   }
  // }

  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, tel, role } = req.body;
      const newUser = await createUser({
        name,
        email,
        password,
        tel,
        role,
      });
      console.log(newUser);
      return res.status(StatusCodes.CREATED).json(newUser);
    } catch (err: any) {
      console.log(err.name);
      if (
        err.name === 'ValidationError' ||
        err.name === 'CastError' ||
        err.name === 'DuplicateKeyError' ||
        err.name === 'MongoServerError'
      ) {
        res.status(StatusCodes.BAD_REQUEST).json(err.message);
        next();
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await findUserByEmail(req.body.email);
      return res.status(201).json(user);
    } catch (err) {
      console.log(err);
      console.error(JSON.stringify(err));
      // const error = err as RequestError;
      // handleErrors(error, req, res, next);
    }
  }

  // async login(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const user = await User.find({ email: req.body.email });
  //     if (!user)
  //       throw new RequestError('Error: can not find user by email', 404);
  //     return res.status(201).json(user);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await findUserById(id);
      return res.status(StatusCodes.OK).json(user);
    } catch (err: any) {
      console.error(JSON.stringify(err));
      if (err.name === 'CastError')
        res.status(StatusCodes.BAD_REQUEST).json(err.message);
      // const error = err as RequestError;
      // handleErrors(error, req, res, next);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await findAllUsers();
      console.log(users);
      res.status(StatusCodes.OK).json(users);
    } catch (err) {
      const error = err as RequestError;
      handleErrors(error, req, res, next);
    }
  };

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await updateUser(id, data);
      res.status(200).json(user);
      // try {
      //   const { id } = req.params;
      //   const user = await User.findOne({ _id: id });

      //   if (!user) {
      //     throw new RequestError(
      //       'Error in updateUser: no user with such id',
      //       404,
      //     );
      //   }
      //   const data = req.body;
      //   if (!data) {
      //     throw new RequestError(
      //       'Error: The fields for update are required',
      //       404,
      //     );
      //   }
      //   await User.updateOne({ _id: id }, { ...data });
      //   const userUpdated = await User.findById(id);
      //   return res.status(200).json(userUpdated);
    } catch (err) {
      const error = err as RequestError;
      handleErrors(error, req, res, next);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await deleteUser(id);
      return res
        .status(StatusCodes.NO_CONTENT)
        .json('Success while delete user');
      //   const { id } = req.params;
      //   const user = await User.findOne({ _id: id });
      //   if (!user) {
      //     throw new RequestError(
      //       'Error while delete User: no user with such id',
      //       404,
      //     );
      //   }
      //   await User.findByIdAndDelete({ _id: id });
      //   return res.status(204).json('Success while delete user');
    } catch (err) {
      const error = err as RequestError;
      handleErrors(error, req, res, next);
    }
  }
}

export default new UserController();
