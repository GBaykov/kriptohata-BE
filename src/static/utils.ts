import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class RequestError extends Error {
  public status: number;
  public message: string;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'Request Error';
    this.message = message || 'Server Error!';
    this.status = status || 404;
  }
}

export function handleErrors(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof Error) {
    if (
      err.name === 'ValidationError' ||
      err.name === 'CastError' ||
      err.name === 'DuplicateKeyError' ||
      err.name === 'MongoServerError'
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ name: err.name, message: err.message });
      next();
    }
  } else if (err instanceof RequestError) {
    res.status(err.status).json(err.message);
    next();
  } else return res.status(500).json({ message: 'Unexpected error' });
}
