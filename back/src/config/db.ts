import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🟢 Conectado a MongoDB");
  } catch (error) {
    console.error("🔴 Error conectando a MongoDB", error);
    process.exit(1);
  }
};