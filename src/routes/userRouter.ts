import express, { Router, Request, Response, NextFunction } from "express";
import userController from "../controllers/mongoUserController";
// import userController from "../controllers/userController";
const userRouter: Router = express.Router();

userRouter.post("/registration", userController.registration);
userRouter.post("/login", userController.login);
// router.get('/auth', userController.check)

userRouter.get("/", userController.getAll);

userRouter.get("/:id", userController.getOne);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.delete);

export default userRouter;
