import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/authService";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, birthdate, password, gender } = req.body;
    
    if (!name || !email || !birthdate || !password) {
      res.status(400).json({ message: "Required fields are missing" });
      return;
    }

    // Validar que birthdate sea una fecha válida
    const birthDateObj = new Date(birthdate);
    if (isNaN(birthDateObj.getTime())) {
      res.status(400).json({ message: "Birthdate must be a valid date." });
      return;
    }

    const user = await registerUser(name, email, birthdate, password, gender || undefined);
    res.status(201).json({ message: "Successful User Register", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user; // Asegúrate de que req.user existe

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "ToDoDEVU",
      { expiresIn: "1h" }
    );
    res.cookie("authToken", token, {
      httpOnly: true, // Impide que el token sea accesible a través de JavaScript en el frontend.
      secure: process.env.NODE_ENV === "production", // Solo se enviará por HTTPS en producción.
      sameSite: "strict", // Mejora la seguridad al limitar el envío del token a solicitudes del mismo sitio.
      maxAge: 3600000, // Tiempo de expiración del token (1 hora en milisegundos).
    });
    res.status(200).json({
      message: "Login successfuly",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({ message: "Successful Logout" });
  } catch (error) {
    next(error);
  }
};