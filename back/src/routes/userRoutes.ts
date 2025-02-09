import express from "express";
import { deleteUserController, getAllController, getByIdController } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllController);
router.get("/:id", getByIdController);
router.delete("/:id", deleteUserController);

export default router;
