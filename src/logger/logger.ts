import { Request, Response, NextFunction } from 'express';

import winston, { createLogger } from 'winston';
import appRoot from 'app-root-path';
import { LOG_LVL, NODE_ENV } from '../common/config';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};
winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console(),
  // Allow to print all the error level messages inside the error.log file
  new winston.transports.File({
    filename: `${appRoot}/logs/errors.log`,
    level: 'error',
  }),
  // Allow to print all the error message inside the all.log file
  // (also the error log that are also printed inside the error.log(
  new winston.transports.File({ filename: `${appRoot}/logs/combined.log` }),
];

const Logger = createLogger({
  level: level(),
  levels,
  format,
  transports,
});
export default Logger;

// export async function logging(req: Request, res: Response, next: NextFunction) {
//   const { url } = req;
//   const params = JSON.stringify(req.params);
//   const body = JSON.stringify(req.body);
//   const query: string = JSON.stringify(req.query);
//   const statusCode: number = await res.statusCode;
//   const header = JSON.stringify(req.headers);
//   const log = 'info';
//   // console.log(JSON.stringify(appRoot))
//   const message = `[method = ${req.method}] -:- url:${url} - body:${body} -HEADER${header} `;
//   logger.log(log, message);
// }
