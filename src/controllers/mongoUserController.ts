import { NextFunction, Request, Response } from "express";
import { createMongoUser } from "../services/example";

exports.createExample = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, tel, role } = req.body;
    const newUser = await createMongoUser({
      name,
      email,
      password,
      tel,
      role,
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
