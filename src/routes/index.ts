import express, { Router } from "express";
import deviceRouter from "./deviceRouter";
import userRouter from "./userRouter";
import favoritesRouter from "./favoritesRouter";
import ordersRouter from "./ordersRouter";
import callBacksRouter from "./callBacksRouter";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/devices", deviceRouter);
router.use("/favorites", favoritesRouter);
router.use("/orders", ordersRouter);
router.use("/callbacks", callBacksRouter);

export default router;
