import express, { Router, Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
import { User } from "../types";
import DB from "../db/db";
import { RequestError } from "../static/utils";
import { v4 as uuid } from "uuid";
import favoritesController from "./favoritesController";

class UserController {
  static toResponse(user: User) {
    const { password, ...data } = user;
    return { ...data };
  }

  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = req.body;

      if (!user.email || !user.password || !user.tel || !user.name)
        throw new RequestError("Error: can not create user", 404);
      user.id = uuid();
      user.favourites_id = uuid();
      await DB.users.push(user);
      const user_to_responce = UserController.toResponse(user);

      const favoritesRequest: any = { ...req };
      favoritesRequest.body.user_id = user.id;
      favoritesRequest.body.id = user.favourites_id;
      favoritesController.create(favoritesRequest, res, next);

      res.status(201).json(user_to_responce);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = DB.users.find(
        (user) =>
          user.email === req.body.email && user.password === req.body.password
      );
      if (!user) throw new RequestError("Error: can not find user", 404);
      const user_to_responce = UserController.toResponse(user);
      res.status(201).json(user_to_responce);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await DB.users;
      if (!users) throw new Error("NOO users");

      res.status(200).json(users.map(UserController.toResponse));
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await DB.users.find((user) => user.id === id);
      if (!user || !id) throw new Error("NOO users or id");
      res.status(200).json(UserController.toResponse(user));
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await DB.users.find((item) => item.id === id);
      const index = await DB.users.findIndex((user) => user.id === id);
      if (!user || !index || index === -1) {
        throw new RequestError(
          "Error in updateUser: no user with such id",
          404
        );
      }
      const new_user = { ...user, ...data };
      new_user.id = id;
      await DB.users.splice(index, 1, new_user);
      res.status(201).json(UserController.toResponse(new_user));
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const index = await DB.users.findIndex((user, index) => user.id === id);
      if (index === -1) throw new RequestError("NOO users or id", 404);
      await DB.users.splice(index, 1);
      res.status(200).json("Success while delete user");
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
