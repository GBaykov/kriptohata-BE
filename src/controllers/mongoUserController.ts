import { NextFunction, Request, Response } from "express";
import { createMongoUser } from "../services/example";
import { User as UserType } from "../types";
import { User } from "../shemas/user_shema";
import { RequestError } from "../static/utils";

class UserController {
  static toResponse(user: UserType) {
    const { password, ...data } = user;
    return data;
  }
  async registration(req: Request, res: Response, next: NextFunction) {
    {
      try {
        const { name, email, password, tel, role } = req.body;
        const newUser = await createMongoUser({
          name,
          email,
          password,
          tel,
          role,
        });
        res.status(200).json(newUser);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.find({ email: req.body.email });
      // const user = DB.users.find(
      //   (user) =>
      //     user.email === req.body.email && user.password === req.body.password
      // );
      if (!user)
        throw new RequestError("Error: can not find user by email", 404);

      // const user_to_responce = UserController.toResponse(user);
      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        throw new RequestError("Error in findUser: no user with such id", 404);
      }
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ _id: id });

      if (!user) {
        throw new RequestError(
          "Error in updateUser: no user with such id",
          404
        );
      }
      const data = req.body;
      if (!data) {
        return res
          .status(422)
          .json({ message: "The fields for update are required" });
      }

      console.log(data);
      await User.updateOne({ _id: id }, { ...data });

      const userUpdated = await User.findById(id);

      return res.status(200).json(userUpdated);

      // const new_user = { ...user, ...data };
      // new_user.id = id;
      // await DB.users.splice(index, 1, new_user);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ _id: id });
      if (!user) {
        throw new RequestError(
          "Error in updateUser: no user with such id",
          404
        );
      }
      await User.findByIdAndDelete({ _id: id });
      return res.status(204).json("Success while delete user");
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();

// exports.createExample = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { name, email, password, tel, role } = req.body;
//     const newUser = await createMongoUser({
//       name,
//       email,
//       password,
//       tel,
//       role,
//     });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
