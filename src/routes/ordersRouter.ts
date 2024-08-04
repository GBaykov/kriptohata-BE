import express, { Router } from "express";
const router: Router = express.Router();
import ordersController from "../controllers/ordersController";

router.get("/", ordersController.getAll);
router.post("/", ordersController.create);
router.get("/:id", ordersController.getOneByUserId);
// router.put("/:id", ordersController.update);
router.delete("/:id", ordersController.delete);

export default router;
