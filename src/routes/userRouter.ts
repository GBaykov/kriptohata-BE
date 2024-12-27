import express, { Router } from 'express';
import userController from '../controllers/userController';
const userRouter: Router = express.Router();

userRouter.get('/', userController.getAll);

userRouter.get('/:id', userController.getOne);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);

export default userRouter;
