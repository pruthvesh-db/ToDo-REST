import { Request, Response, NextFunction } from "express";
import { check, validationResult, ValidationChain } from "express-validator";

// Task Validation Middleware
const validateTask: ValidationChain[] = [
  check("title").notEmpty().withMessage("Title is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("dueDate")
    .notEmpty().withMessage("Due date is required")
    .isISO8601().withMessage("Due date must be in the format YYYY-MM-DD"),
];

// Error handling middleware
const handleValidationErrors = (req: Request, res: Response, next: NextFunction): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

export { validateTask, handleValidationErrors };