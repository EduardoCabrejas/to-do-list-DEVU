import { Request, Response, NextFunction } from "express";

export const validateCreateTask = (req: Request, res: Response, next: NextFunction): void => {
  const { title, type, status } = req.body;

  if (!title || !type || !status ) {
    res.status(400).json({ message: "Missing required fields: title, type, or status" });
    return;
  }

  // Validate status
  const validStatuses = ["Pending", "In-Progress", "Completed"];
  if (!validStatuses.includes(status)) {
    res.status(400).json({
      message: `Invalid status. The valid statuses are: ${validStatuses.join(", ")}`
    });
    return;
  }

  // Validate type
  const validTaskTypes = ["Sport", "Art", "Study", "Work", "Social", "Daily Routine", "Health", "Finance", "Technology"];
  if (!validTaskTypes.includes(type)) {  // <-- Aquí validamos correctamente
    res.status(400).json({
      message: `Invalid type. The valid types are: ${validTaskTypes.join(", ")}`
    });
    return;
  }

  next();
};
