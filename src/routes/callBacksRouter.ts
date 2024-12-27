import express, { Router } from "express";
const router: Router = express.Router();
import callBacksController from "../controllers/callBacksController";

router.get("/", callBacksController.getAll);
router.post("/", callBacksController.create);
router.get("/:id", callBacksController.getAll);
router.delete("/", callBacksController.deleteAll);

export default router;
