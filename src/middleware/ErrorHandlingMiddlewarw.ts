import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError";

function errorHendler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "unexpected error" });
}

export default errorHendler;
