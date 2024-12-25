import { NextFunction, Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  updateUser,
} from '../services/user_service';
import { handleErrors } from '../static/utils';
import { StatusCodes } from 'http-status-codes';

class UserController {
  // async registration(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { name, email, password, tel, role } = req.body;
  //     const newUser = await createUser({
  //       name,
  //       email,
  //       password,
  //       tel,
  //       role,
  //     });
  //     return res.status(StatusCodes.CREATED).json(newUser);
  //   } catch (err: unknown) {
  //     handleErrors(err, req, res, next);
  //   }
  // }

  // async login(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const signToken
  //     const user = await findUserByEmail(req.body.email);
  //     return res.status(201).json(user);
  //   } catch (err: unknown) {
  //     handleErrors(err, req, res, next);
  //   }
  // }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await findUserById(id);
      return res.status(StatusCodes.OK).json(user);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await findAllUsers();
      res.status(StatusCodes.OK).json(users);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  };

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await updateUser(id, data);
      res.status(StatusCodes.OK).json(user);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await deleteUser(id);
      return res
        .status(StatusCodes.NO_CONTENT)
        .json('Success while delete user');
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }
}

export default new UserController();
