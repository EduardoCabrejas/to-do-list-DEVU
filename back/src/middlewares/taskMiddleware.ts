import { Request, Response, NextFunction } from "express";

export const validateCreateTask = (req: Request, res: Response, next: NextFunction): void => {
  const { title, type, status, priority } = req.body;

  if (!title || !type || !status || !priority) {
    res.status(400).json({ message: "Missing required fields: title, type, status or priority" });
    return;  // Agregamos un "return" aquí para asegurarnos de que no se llame a "next()" después de una respuesta.
  }

  // Validate type
  const validTaskTypes = ["Sport", "Art", "Study", "Work", "Social", "Daily Routine", "Health", "Finance", "Technology"];
  if (!validTaskTypes.includes(type)) {
    res.status(400).json({
      message: `Invalid type. The valid types are: ${validTaskTypes.join(", ")}`
    });
    return;  // Detenemos la ejecución aquí, no llamamos a "next()"
  }

  // Validate status
  const validStatuses = ["Pending", "In-Progress", "Completed"];
  if (!validStatuses.includes(status)) {
    res.status(400).json({
      message: `Invalid status. The valid statuses are: ${validStatuses.join(", ")}`
    });
    return;  // Detenemos la ejecución aquí
  }

  // Validate priority
  const validPriorities = ["Low", "Medium", "High"];
  if (!validPriorities.includes(priority)) {
    res.status(400).json({
      message: `Invalid priority. The valid priorities are: ${validPriorities.join(", ")}`
    });
    return;  // Detenemos la ejecución aquí
  }

  // Si todo es válido, procedemos al siguiente middleware o controlador
  next();
};