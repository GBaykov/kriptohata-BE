import { NextFunction, Request, Response } from 'express';

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
  err: RequestError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err);
  res.status(err.status).json(err.message);
  next();
}
