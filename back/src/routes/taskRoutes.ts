import express from "express";
import { 
  createTaskController, 
  deleteTaskController, 
  getAllTasksController, 
  getTaskByIdController,
  updateTaskController 
} from "../controllers/taskController";
import { validateCreateTask } from "../middlewares/taskMiddleware";
import { getJwtMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API to manage Tasks
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get All Tasks
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Tasks List obtained correctly
 */
router.get("/", getJwtMiddleware, getAllTasksController);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a Task By ID
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task obtained correctly
 */
router.get("/:id", getJwtMiddleware, getTaskByIdController);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create A New Task
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created correctly
 */
router.post("/", getJwtMiddleware, validateCreateTask, createTaskController);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a Task By ID
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID to delete
 *     responses:
 *       200:
 *         description: Task deleted correctly
 */
router.delete("/:id", getJwtMiddleware, deleteTaskController);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update A Task
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated correctly
 */
router.put("/:id", getJwtMiddleware, updateTaskController);

export default router;