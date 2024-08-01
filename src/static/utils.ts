import { NextFunction, Request, Response } from "express";

export class RequestError extends Error {
  public status: number;

  public message: string;

  constructor(message: string, status: number) {
    super(message);
    this.name = "Request Error";
    this.message = message || "Server Error!";
    this.status = status || 404;
  }
}

export function handleErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).json(err.message);
}
