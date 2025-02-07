import { Schema, model, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  type: string;
  status: "pending" | "in-progress" | "completed" | "archived";
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "archived"],
      default: "pending",
    },
    dueDate: { type: Date },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", TaskSchema);
