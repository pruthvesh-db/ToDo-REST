import { Request, Response, NextFunction } from "express";
import { check, validationResult, ValidationChain } from "express-validator";

// Credentials Validation Middleware
const validateSignup: ValidationChain[] = [
  check("email").isEmail().withMessage("Please provide a valid email"),
  check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

const validateLogin: ValidationChain[] = [
  check("email").isEmail().withMessage("Please provide a valid email"),
  check("password").notEmpty().withMessage("Password is required"),
];


// Error handling middleware
const handleValidationErrors = (req: Request, res: Response, next: NextFunction): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


export { validateSignup, validateLogin, handleValidationErrors };