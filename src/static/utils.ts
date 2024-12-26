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
      [
        'ValidationError',
        'CastError',
        'DuplicateKeyError',
        'MongoServerError',
      ].includes(err.name)
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ name: err.name, message: err.message });
    } else if (err instanceof RequestError) {
      res.status(err.status).json(err.message);
    } else {
      res.status(404).json({ name: err.name, message: err.message });
    }
  } else {
    res.status(500).json({ message: 'Unexpected error' });
  }
  next();
}
