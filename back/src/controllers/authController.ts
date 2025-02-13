import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/authService";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, age, password, gender } = req.body;
    if (!name || !email || !age || !password) {
      res.status(400).json({ message: "Required fields are missing" });
      return;
    }
    const ageNumber = Number(age);
    if (isNaN(ageNumber)) {
      res.status(400).json({ message: "Age has to be a valid number." });
      return;
    }
    const user = await registerUser(name, email, ageNumber.toString(), password, gender || undefined);
    res.status(201).json({ message: "Successful User Register", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);

    if (!data || !data.token) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isProduction = process.env.NODE_ENV === "production";

    // Safe configuration for cookies
    res.cookie("authToken", data.token, {
      httpOnly: true,
      secure: isProduction, // just in production
      sameSite: isProduction ? "none" : "lax", // "none" if it's in Vercel, "lax" if it's in local
      maxAge: 60 * 60 * 1000, // 1 houre
    });

    res.status(200).json({ message: "Successful Login" });
  } catch (error) {
    next(error);
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