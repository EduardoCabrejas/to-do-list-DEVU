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

if (process.env.NODE_ENV !== "test") {
  connectDB();
}

export const app = express();

// Middlewares
app.use(express.json());

const frontendUrl = process.env.FRONTEND_URL;
const allowedOrigins: string[] = process.env.NODE_ENV === "production"
  ? [frontendUrl!].filter(Boolean) // If frontendUrl is empty, it will be removed
  : ["http://localhost:3000", frontendUrl!].filter(Boolean);

// Warning
if (process.env.NODE_ENV === "production" && !frontendUrl) {
  console.warn("⚠️ FRONTEND_URL is not defined in production.");
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("dev"));

// Swagger Documentation
setupSwagger(app);

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// HandleErrors Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}