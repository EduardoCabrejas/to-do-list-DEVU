import express from "express";
import { register, login, logout } from "../controllers/authController";
import { checkEmailExists, checkLoginCredentials } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/register", (req, res) => {
    res.json({ message: "Register endpoint funcionando" });
  });
router.post("/register", checkEmailExists, register);
router.get("/login", (req, res) => {
    res.json({ message: "Login endpoint funcionando" });
  });
router.post("/login", checkLoginCredentials, login);
router.post("/logout", logout);

export default router;
