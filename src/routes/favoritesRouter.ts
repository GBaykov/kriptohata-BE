import express, { Router } from "express";
const router: Router = express.Router();
import favoritesController from "../controllers/favoritesController";

router.get("/", favoritesController.getAll);
router.post("/", favoritesController.create);
router.get("/:id", favoritesController.getOne);
router.put("/:id", favoritesController.update);
router.delete("/:id", favoritesController.delete);

export default router;
