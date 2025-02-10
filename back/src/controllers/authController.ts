import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, age, password, gender } = req.body;
    if (!name || !email || !age || !password) {
      res.status(400).json({ message: "Required fields are missing" });
      return;
    }
    const ageNumber = Number(age);
if (isNaN(ageNumber)) {
      res.status(400).json({ message: "Age have to be a valid number." });
      return;
    }
const user = await registerUser(name, email, ageNumber, password, gender || undefined);
res.status(201).json({ message: "Successful User Register", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);

    res.status(200).json({message: "Successful Login", data});
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({ message: "Successful Logout" });
  } catch (error) {
    next(error);
  }
};