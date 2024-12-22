import express, { Request, Response, NextFunction } from 'express';
import { Device, Favorite } from '../types';
import { RequestError } from '../static/utils';

import DB from '../db/db';
import {
  createFavorite,
  deleteFavorite,
  updateFavoriteById,
  //   updateFavoriteByUserId,
} from '../services/favorite_service';
import { StatusCodes } from 'http-status-codes';
import { json } from 'body-parser';

class FavoritesController {
  async create(req: Request, res: Response, next: NextFunction) {
    const user_id = req.body.user_id;
    const favorite = await createFavorite(user_id);
    res.status(StatusCodes.CREATED).json(favorite);
    // try {
    //   const id = req.body.id;
    //   const items: Device[] = [];
    //   const favorite: Favorite = { user_id, id, items };

    //   if (!favorite.id || !favorite.user_id || !favorite.items) {
    //     console.log(favorite);
    //     throw new RequestError('Error: can not create user favorites', 404);
    //   }
    // } catch (err) {
    //   next(err);
    // }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const favorites = await DB.favorites;
      if (!favorites) throw new Error('NOO favorites');

      res.status(200).json(favorites);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const favorite = await DB.favorites.find((item) => item.id === id);
      if (!favorite || !id) throw new Error('NOO favorite or id');
      res.status(200).json(favorite);
    } catch (err) {
      next(err);
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
    const { id } = req.params;
    const device_id = req.body;
    const favorite = updateFavoriteById(id, device_id);
    res.status(StatusCodes.OK).json(favorite);

    // try {
    //   const { id } = req.params;
    //   const data: Device = req.body;
    //   const favorite = await DB.favorites.find((item) => item.id === id);
    //   const index = await DB.favorites.findIndex((item) => item.id === id);

    //   if (!favorite || index === -1) {
    //     throw new RequestError(
    //       'Error in updat Favorites: no favorite with such user_id',
    //       404,
    //     );
    //   }

    //   if (favorite?.items.findIndex((item) => item.name === data.name) !== -1) {
    //     const item_index = favorite.items.findIndex(
    //       (item) => item.id === data.id,
    //     );
    //     favorite.items.splice(item_index, 1);
    //   } else {
    //     favorite?.items.push(data);
    //   }

    //   await DB.favorites.splice(index, 1, favorite);
    //   res.status(201).json(favorite);
    // } catch (err) {
    //   next(err);
    // }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    await deleteFavorite(id);
    res.status(StatusCodes.NO_CONTENT).json('favorite has been deleted');
    //     try {
    //       const { id } = req.params;
    //       const index = await DB.favorites.findIndex((item) => item.id === id);
    //       if (index === -1) {
    //         throw new RequestError(
    //           'Error in delete Favorites: no favorite with such user_id',
    //           404,
    //         );
    //       }
    //       await DB.favorites.splice(index, 1);
    //       res.status(201);
    //     } catch (err) {
    //       next(err);
    //     }
  }
}

export default new FavoritesController();
