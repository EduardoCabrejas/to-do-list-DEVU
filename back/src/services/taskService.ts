import { TaskDto } from "../dto/TaskDto";
import { Task } from "../entities/Task";
import { User } from "../entities/User";

export const createTask = async (userId: string, taskData: any) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const task = new Task({ ...taskData, userId });
  await task.save();

  user.tasks.push(task._id as any);
  await user.save();

  return new TaskDto(task);
};

export const getAllTasks = async (userId: string) => {
  const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
  return tasks;
};

export const getTaskById = async (id: string, userId: string) => {
  const task = await Task.findOne({ _id: id, userId }).populate("userId", "name");
  if (!task) {
    throw new Error("Task not found or unauthorized");
  }
  return task;
};

export const deleteTask = async (id: string, userId: string) => {
  const task = await Task.findOneAndDelete({ _id: id, userId });
  if (!task) throw new Error("Task not found or unauthorized");
  return { message: "Task deleted successfully", deletedTask: task };
};

export const updateTask = async (id: string, userId: string, taskData: TaskDto): Promise<TaskDto> => {
  const task = await Task.findOneAndUpdate({ _id: id, userId }, taskData, { new: true });
  if (!task) throw new Error(`Task does not exist or you don't have permission to update it`);
  return new TaskDto(task);
};