import express, { Router } from "express";
const router: Router = express.Router();
import typeController from "../controllers/typeController";

// router.get('/', typeController.getAll)
// router.post('/', typeController.create)
router.get("/:id", typeController.getOne);
router.put("/:id", typeController.update);
router.delete("/:id", typeController.delete);

export default router;
