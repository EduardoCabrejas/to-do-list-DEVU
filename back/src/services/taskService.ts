import { TaskDto } from "../dto/TaskDto";
import { Task } from "../entities/Task";
import { User } from "../entities/User";

export const createTask = async (userId: string, taskData: any) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }
  const task = new Task({ ...taskData, userId });
  await task.save();

  await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } });

  return new TaskDto(task);
};

  export const getAllTasks = async (userId: string) => {
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    if (!tasks || tasks.length === 0) {
      throw new Error("No tasks found");
    }

    return tasks;
  }

  export const getTaskById = async (id: string) => {
    const task = await Task.findById(id).populate('userId', 'name');
    if (!task) {
      throw new Error('Task not found');
    }
  
    return task;
  };

  export const deleteTask = async (id: string) => {
    const task = await Task.findByIdAndDelete(id);
    if (!task) throw new Error(`Task does not exist`);
    
    return { message: "Task deleted successfully", deletedTask: task };
  };