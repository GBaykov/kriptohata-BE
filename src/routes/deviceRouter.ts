import express, { Router } from "express";
const router: Router = express.Router();
import deviceController from "../controllers/deviceController";

// router.get("/", deviceController.getAll);
// router.post("/", deviceController.create);

router.get("/:id", deviceController.getOne);
router.delete("/:id", deviceController.delete);
router.put("/:id", deviceController.update);

export default router;
