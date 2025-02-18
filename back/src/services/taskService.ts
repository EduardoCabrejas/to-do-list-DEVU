import { TaskDto } from "../dto/TaskDto";
import { Task } from "../entities/Task";
import { User } from "../entities/User";

class TaskNotFoundError extends Error {
  constructor() {
    super("Task not found or unauthorized");
    this.name = "TaskNotFoundError";
  }
}

export const createTask = async (userId: string, taskData: TaskDto) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const task = new Task({ ...taskData, userId });
  await task.save();
  user.tasks.push(task._id as any);

  // Try to save the user
  try {
    await user.save();
  } catch (error) {
    const err = error as Error;
    throw new Error("Failed to Create User Tasks: " + err.message);
  }

  return new TaskDto(task);
};

export const getAllTasks = async (userId: string) => {
  const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
  return tasks;
};

export const getTaskById = async (id: string, userId: string) => {
  const task = await Task.findOne({ _id: id, userId }).populate("userId", "name");
  if (!task) throw new TaskNotFoundError();
  return task;
};

export const deleteTask = async (id: string, userId: string) => {
  const task = await Task.findOneAndDelete({ _id: id, userId });
  if (!task) throw new TaskNotFoundError();
  return { message: "Task deleted successfully", deletedTask: task };
};

export const updateTask = async (id: string, userId: string, taskData: TaskDto): Promise<TaskDto> => {
  const task = await Task.findOneAndUpdate({ _id: id, userId }, taskData, { new: true });
  if (!task) throw new TaskNotFoundError();
  return new TaskDto(task);
};