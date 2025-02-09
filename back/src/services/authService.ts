import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

const secret = process.env.JWT_SECRET || "secreto"; 

export const registerUser = async (name: string, email: string, age: number, password: string, gender?: string, ) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  if (age < 9) {
    throw new Error("La edad debe ser mayor o igual a 9");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    age,
    gender: gender || undefined,
    password: hashedPassword,
  });

  await newUser.save();

  return { name, email, age, gender };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales inválidas");
  }

  const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: "1h" });

  return { token, user: { name: user.name, email: user.email } };
};