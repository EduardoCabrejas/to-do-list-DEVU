import express from "express";
import { register, login, logout } from "../controllers/authController";
import { checkEmailExists, checkLoginCredentials, validateRegister } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API to manage authentication (register, login, logout)
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - age
 *               - password
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
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongPass123!"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "65f23a8b9d1234abcd567890"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 age:
 *                   type: integer
 *                   example: 25
 *                 gender:
 *                   type: string
 *                   example: "Male"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-02-09T12:34:56.789Z"
 *       400:
 *         description: Email already exists or validation error
 *       500:
 *         description: Internal server error
 */
router.post("/register", checkEmailExists, validateRegister, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123!
 *     responses:
 *       200:
 *         description: Login successful, returns access token
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", checkLoginCredentials, login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", logout);

export default router;