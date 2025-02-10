import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserDto } from "../dto/UserDto";
import { User } from "../entities/User";
// Extending the Request interface to include user of type UserDto
declare module "express-serve-static-core" {
  interface Request {
    user?: UserDto;
  }
}

export const checkEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "The user with this email already exist" });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const checkLoginCredentials = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    req.user = new UserDto(user);
    next();
  } catch (error) {
    next(error);
  }
};

export const getJwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = new UserDto(user);
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }
};