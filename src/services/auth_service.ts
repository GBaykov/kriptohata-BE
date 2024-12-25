import express, { Router, Request, Response, NextFunction } from 'express';
import Jwt, { GetPublicKeyOrSecret, JwtPayload, Secret } from 'jsonwebtoken';

import { JWT_SECRET_KEY } from '../common/config';
import { StatusCodes } from 'http-status-codes';
import { findUserById } from './user_service';
import { RequestError } from '../static/utils';

const PATHS_WITHOUT_AUTH = [
  '/api/auth/registration',
  '/api/auth/login',
  '/doc',
  '/',
  '/api',
  '/api/callbacks',
  '/api/devices',
];

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  console.log('req.url', req.url);
  console.log('req.method', req.method);

  if (
    !PATHS_WITHOUT_AUTH.includes(req.url) &&
    !(req.url.includes('/orders/') && req.method === 'POST')
  ) {
    const tokenString = req.header('Authorization');

    if (tokenString) {
      const [type, token] = tokenString.split(' ');
      if (type !== 'Bearer') {
        res.status(401).send('Wrong auth schema');
      } else {
        if (!JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY is undefined');
        try {
          const resp: string | JwtPayload = <JwtPayload>(
            Jwt.verify(token, JWT_SECRET_KEY)
          ); // <JwtPayload>
          console.log('resp', resp);
          const user = await findUserById(resp._id);
          console.log(user);
          if (!user || user?.email !== resp.email) {
            throw new RequestError('Unauthorized', StatusCodes.UNAUTHORIZED);
          } else {
            next();
          }
        } catch (err) {
          res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
        }
      }
    } else {
      res.status(401).send('Unauthorized');
    }
  } else {
    console.log(req.url);
    next();
  }
};
export default checkToken;
