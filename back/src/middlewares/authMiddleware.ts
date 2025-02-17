import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";
import { validateUserData } from "../utils/validateUserData";
import { UserDto } from "../dto/UserDto";
// Extends Document in Express in type Request
declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
    }
  }
}

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const errors: string[] = validateUserData(req.body) || [];

  if (errors.length > 0) {
    res.status(400).json({ message: errors.join(' ') });
    return;
  }

  next();
};

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
      res.status(401).json({ message: "Invalid email" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    req.user = {
      id: user._id,
      email: user.email,
      name: user.name
    } as UserDto;
    next();
  } catch (error) {
    next(error);
  }
};

export const getJwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken; // Obtener el token desde las cookies

  if (!token) {
    res.status(401).json({ message: 'Unauthorized. Token is missing or invalid' });
    return;
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ToDoDEVU');
    req.user = decoded as UserDto;  // Aquí asignamos UserDto a req.userDto
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized. Invalid token' });
    return;
  }
};