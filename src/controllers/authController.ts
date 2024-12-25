import { NextFunction, Request, Response } from 'express';
import { createUser } from '../services/user_service';
import { handleErrors } from '../static/utils';
import { StatusCodes } from 'http-status-codes';
import { signToken } from '../static/bcrypt.helpers';

class AuthController {
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
      return res.status(StatusCodes.CREATED).json(newUser);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const data = await signToken(email, password);
      return res.status(StatusCodes.OK).json(data);
    } catch (err: unknown) {
      handleErrors(err, req, res, next);
    }
  }
}

export default new AuthController();
