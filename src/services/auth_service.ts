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
];

const isAuthUrl = (req: Request) => {
  if (PATHS_WITHOUT_AUTH.includes(req.url)) return false;
  if (req.url.includes('/api/callbacks') && req.method === 'POST') return false;
  if (req.url.includes('/api/orders') && req.method === 'POST') return false;
  if (req.url.includes('/api/devices') && req.method === 'GET') return false;

  return true;
};

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, 20);
  console.log(req.baseUrl, 21);
  const isAuth = isAuthUrl(req);
  if (isAuth) {
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
          );
          const user = await findUserById(resp._id);
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
