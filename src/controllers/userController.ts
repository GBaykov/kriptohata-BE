import express, { Router, Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";

class UserController {
  async registration(req: Request, res: Response) {}

  async login(req: Request, res: Response) {}

  async check(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("ID not set"));
    }
    res.json(id);
  }

  async getAll(req: Request, res: Response) {}

  async getOne(req: Request, res: Response) {}

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}
}

export default new UserController();
