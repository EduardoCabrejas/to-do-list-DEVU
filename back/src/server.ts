import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";
import { setupSwagger } from "./swagger";
import authRoutes from "./routes/authRoutes";

connectDB();

dotenv.config();

export const app = express();
setupSwagger(app);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(errorHandler);

// Rutas
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});