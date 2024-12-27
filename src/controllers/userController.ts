import { NextFunction, Request, Response } from 'express';
import {
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
} from '../services/user_service';
import { handleErrors } from '../static/utils';
import { StatusCodes } from 'http-status-codes';

class UserController {
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
