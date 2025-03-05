import { Request, Response, NextFunction } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../services/userService";

export const deleteUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authenticatedUser = req.user?.id;
    const { id } = req.params;

    if (!authenticatedUser) {
      res.status(401).json({ message: "Unauthorized. User not found" });
      return;
    }

    if (authenticatedUser !== id) {
      res.status(403).json({ message: "Forbidden. You can only delete your own account" });
      return;
    }

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

export const updateUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);
    
        if (!user) {
          res.status(404).json({ message: `User not found` });
          return;
        }
        
    res.status(200).json({ message: "User updated correctly", user });
  } catch (error) {
    next(error);
  }
};
