import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../entities/User";

const secret = process.env.JWT_SECRET || "supersecretkey";

interface TokenPayload {
  id: string;
  email: string;
  name: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Acceso denegado" });

  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    
    req.user = {
      _id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    } as IUser;
    res.status(201).json({ message: "Acceso Autorizado" });
    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido" });
  }
};