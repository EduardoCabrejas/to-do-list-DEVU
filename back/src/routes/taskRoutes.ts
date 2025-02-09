import express from "express";
import { createTaskController, deleteTaskController, getAllTasksController, getTaskByIdController } from "../controllers/taskController";
import { validateCreateTask } from "../middlewares/taskMiddleware";
import { getJwtMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/task/:id", getJwtMiddleware, getTaskByIdController);  // Agregado authMiddleware
router.delete("/task/:id", getJwtMiddleware, deleteTaskController);  // Agregado authMiddleware
router.post("/", getJwtMiddleware, validateCreateTask, createTaskController);  // Agregado authMiddleware
router.get("/", getJwtMiddleware, getAllTasksController);  // Agregado authMiddleware

export default router;