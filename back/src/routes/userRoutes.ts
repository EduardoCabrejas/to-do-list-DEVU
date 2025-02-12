import express from "express";
import { deleteUserController,
        getAllController,
        getByIdController,
        updateUserController} from "../controllers/userController";
import { getJwtMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API to manage Users
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get All Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users List obtained correctly
 */
router.get("/", getAllController);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a User By ID
 *     tags: [Users]
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
 * /user/{id}:
 *   delete:
 *     summary: Delete a User By ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description:  User ID to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User can only delete their own account
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", getJwtMiddleware, deleteUserController);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               age:
 *                 type: integer
 *                 minimum: 9
 *                 example: 25
 *               gender:
 *                 type: string
 *                 enum: ["male", "female", "homosexual", "trans", "hidden"]
 *                 example: "male"
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/:id", getJwtMiddleware, updateUserController);

export default router;
