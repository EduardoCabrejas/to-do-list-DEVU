import { Schema, model, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  type: string;
    status: "Pending" | "In-Progress" | "Completed";
    dueDate?: Date;
    priority?: "Low" | "Medium" | "High";
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
      enum: ["Pending", "In-Progress", "Completed"],
      default: "Pending",
    },
    dueDate: { type: Date },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", TaskSchema);