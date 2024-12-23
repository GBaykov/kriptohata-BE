import express, { Request, Response, NextFunction } from 'express';
import { Device, Favorite } from '../types';
import { handleErrors, RequestError } from '../static/utils';

import {
  createFavorite,
  deleteFavorite,
  findAllFavorites,
  findFavoriteById,
  updateFavoriteById,
  //   updateFavoriteByUserId,
} from '../services/favorite_service';
import { StatusCodes } from 'http-status-codes';
import { json } from 'body-parser';

class FavoritesController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = req.body.user_id;
      const favorite = await createFavorite(user_id);
      res.status(StatusCodes.CREATED).json(favorite);
    } catch (err) {
      const error = err as RequestError;
      handleErrors(error, req, res, next);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const favorites = findAllFavorites();
      res.status(StatusCodes.OK).json(favorites);
    } catch (err) {
      const error = err as RequestError;
      handleErrors(error, req, res, next);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const favorite = await findFavoriteById(id);
      res.status(200).json(favorite);
    } catch (err) {
      const error = err as RequestError;
      handleErrors(error, req, res, next);
    }
  }

  // async getOneByUserId(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const favorite = await DB.favorites.find((item) => item.user_id === id);
  //     if (!favorite || !id) throw new Error("NOO favorite or user_id");
  //     res.status(200).json(favorite);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const device_id = req.body;
      const favorite = updateFavoriteById(id, device_id);
      res.status(StatusCodes.OK).json(favorite);
    } catch (err) {
      const error = err as RequestError;
      handleErrors(error, req, res, next);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await deleteFavorite(id);
      res.status(StatusCodes.NO_CONTENT).json('favorite has been deleted');
    } catch (err) {
      const error = err as RequestError;
      handleErrors(error, req, res, next);
    }
  }
}

export default new FavoritesController();
