import { Request, Response, NextFunction } from "express";
import { deleteUser, getAllUsers, getUserById } from "../services/userService";

export const deleteUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await deleteUser(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

export const getAllController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await getAllUsers();
    if(!users || users.length === 0) 
    {
        res.status(404).json({ message: "No users found"});
    }
    res.status(200).json({ message: "Users found it!", users});
    } catch (error) {
        next(error);
    }
};

export const getByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if(!user) 
        {
            res.status(404).json({ message: "User not found"});
        }
        res.status(201).json({ message: "User found it!", user});
        } catch (error) {
            next(error);
        }
}
