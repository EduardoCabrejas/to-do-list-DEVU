import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";
import { setupSwagger } from "./swagger";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();
connectDB();

export const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Swagger Documentation
setupSwagger(app);

// Rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// HandleErrors Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});