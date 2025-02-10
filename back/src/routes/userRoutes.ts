import express from "express";
import { deleteUserController, getAllController, getByIdController } from "../controllers/userController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API to manage Users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get All Users
 *     tags: [Users]
 *     x-order: 2
 *     responses:
 *       200:
 *         description: Users List obtained correctly
 */
router.get("/", getAllController);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a User By ID
 *     tags: [Users]
 *     x-order: 1
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User obtained correctly
 */
router.get("/:id", getByIdController);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a User By ID
 *     tags: [Users]
 *     x-order: 4
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description:  User ID to delete
 *     responses:
 *       200:
 *         description: User deleted correctly
 */
router.delete("/:id", deleteUserController);

export default router;
