import { Request, Response, NextFunction } from "express";
import { check, validationResult, ValidationChain } from "express-validator";

// Credentials Validation Middleware
const validateSignup: ValidationChain[] = [
  check("email").isEmail().withMessage("Please provide a valid email"),
  check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
  .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
  .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
  .matches(/[0-9]/).withMessage("Password must contain at least one number")
  .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character")
];

const validateLogin: ValidationChain[] = [
  check("email").isEmail().withMessage("Please provide a valid email"),
  check("password").notEmpty().withMessage("Password is required"),
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


export { validateSignup, validateLogin, handleValidationErrors };