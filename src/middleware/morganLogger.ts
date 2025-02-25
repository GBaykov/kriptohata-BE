import morgan, { StreamOptions } from 'morgan';
import { Request, Response, NextFunction } from 'express';
import Logger from '../logger/logger';
import { RequestError } from '../static/utils';

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};
const morganMiddleware = morgan(
  'method: :method url: :url status_code: :status content-length: :res[content-length] -- :response-time ms',

  { stream, skip },
);

export default morganMiddleware;

export function loggingErrors(err: Error | RequestError, req?: Request) {
  const { name, message } = err;
  let method;
  let body;
  let url;
  if (req) {
    method = req.method;
    body = req.body;
    url = req.url;
  }
  const errorStringForLog = `${name} = 404 - ${message} - `;
  const reqStr = `- method:${method} - body:${JSON.stringify(body)} - url:${url}`;
  if (req) {
    Logger.error(errorStringForLog + reqStr);
  } else Logger.error(errorStringForLog);
}

export function AppArrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  loggingErrors(err, req);
  res.status(404).json(err.message);
  next();
}
