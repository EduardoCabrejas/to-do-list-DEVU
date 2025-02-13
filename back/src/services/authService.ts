import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export const registerUser = async (
  name: string,
  email: string,
  birthdate: string,
  password: string,
  gender?: string
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Calcular la edad a partir de la fecha de nacimiento
  const birthDateObj = new Date(birthdate);
  const today = new Date();
  let calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  const dayDiff = today.getDate() - birthDateObj.getDate();

  // Ajustar edad si el cumpleaños no ha pasado este año
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    calculatedAge--;
  }

  if (calculatedAge < 9) {
    throw new Error("Age must be at least 9 years old.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    birthdate,
    age: calculatedAge,
    gender: gender || undefined,
    password: hashedPassword,
  });

  await newUser.save();

  return { name, email, birthdate, age: calculatedAge, gender };
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

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  
  // Generate Token JWT
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return { token, user: { name: user.name, email: user.email } }; // Ya no es necesario devolver el token en el frontend
};