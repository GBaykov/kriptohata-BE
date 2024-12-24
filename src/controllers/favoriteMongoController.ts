import { Request, Response, NextFunction } from 'express';
import { handleErrors } from '../static/utils';

import {
  createFavorite,
  deleteFavorite,
  findAllFavorites,
  findFavoriteById,
  updateFavoriteById,
} from '../services/favorite_service';
import { StatusCodes } from 'http-status-codes';

class FavoritesController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = req.body.user_id;
      const favorite = await createFavorite(user_id);
      res.status(StatusCodes.CREATED).json(favorite);
    } catch (err: unknown) {
      handleErrors;
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const favorites = findAllFavorites();
      res.status(StatusCodes.OK).json(favorites);
    } catch (err: unknown) {
      handleErrors;
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const favorite = await findFavoriteById(id);
      res.status(200).json(favorite);
    } catch (err: unknown) {
      handleErrors;
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
    } catch (err: unknown) {
      handleErrors;
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await deleteFavorite(id);
      res.status(StatusCodes.NO_CONTENT).json('Favorite has been deleted');
    } catch (err: unknown) {
      handleErrors;
    }
  }
}

export default new FavoritesController();
