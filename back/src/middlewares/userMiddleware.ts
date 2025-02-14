import { NextFunction, Request, Response } from "express";
import { validateUserData } from "../utils/validateUserData";

export const validateUpdateUserData = (req: Request, res: Response, next: NextFunction): void => {
    const { password, ...userData } = req.body;
    const errors = validateUserData(userData) || [];
  
    if (errors.length > 0) {
      res.status(400).json({ message: errors.join(' ') });
      return;
    }
  
    next();
  };  