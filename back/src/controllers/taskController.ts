import { Request, Response, NextFunction } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById } from "../services/taskService";

export const createTaskController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user || !req.user.id) {
        res.status(401).json({ message: "Unauthorized. User not found" });
        return;
        }
    const userId = req.user.id;
    const taskData = req.body;
  
    const task = await createTask(userId, taskData);
    res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
    next(error);
    }
};

export const deleteTaskController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    const { id } = req.params;
    const result = await deleteTask(id);
    res.status(200).json(result);
    } catch (error) {
    next(error);
    }
};

export const getAllTasksController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    const tasks = await getAllTasks(userId);
    if (tasks.length === 0) {
        res.status(404).json({ message: "No tasks found" });
        return;
    }
    res.status(200).json({ message: "Tasks found it!", tasks});
    } catch (error) {
        next(error);
    }
};

export const getTaskByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const task = await getTaskById(id);
        if(!task) 
        {
            res.status(404).json({ message: "Task not found"});
        }
        res.status(201).json({ message: "Task found it!", task});
        } catch (error) {
            next(error);
        }
}
