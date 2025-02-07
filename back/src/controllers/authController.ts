import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

const secret = process.env.JWT_SECRET as string;

// Registro de usuario
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "El usuario ya existe" });
      return;
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente", user: { name, email } });
  } catch (error) {
    next(error);
  }
};

// Inicio de sesión
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Credenciales inválidas" });
      return;
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Credenciales inválidas" });
      return;
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, secret, { expiresIn: "1h" });

    res.status(200).json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    next(error);
  }
};