import { Request, Response, NextFunction } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../services/taskService";

const isAuthenticated = (req: Request) => req.user && req.user.id;

export const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
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
      console.error("Error creating task:", error);
      next(error);
    }
  };
  
  export const deleteTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Unauthorized. User not found" });
            return;
          }
      const userId = req.user.id;
      const { id } = req.params;
      const result = await deleteTask(id, userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  
  export const getAllTasksController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Unauthorized. User not found" });
            return;
          }
      const userId = req.user.id;
      const tasks = await getAllTasks(userId);
      if (tasks.length === 0) {
        res.status(404).json({ message: "No tasks found" });
        return;
      }
      res.status(200).json({ message: "Tasks found!", tasks });
    } catch (error) {
      next(error);
    }
  };
  
  export const getTaskByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Unauthorized. User not found" });
            return;
          }
      const userId = req.user.id;
      const { id } = req.params;
      const task = await getTaskById(id, userId);
      res.status(200).json({ message: "Task found!", task });
    } catch (error) {
      next(error);
    }
  };

  export const updateTaskController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: "Unauthorized. User not found" });
        return;
      }
      const { id } = req.params;
      const task = await updateTask(id, req.user.id, req.body);
      res.status(200).json({ message: "Task updated correctly", task });
    } catch (error) {
      next(error);
    }
  }; 