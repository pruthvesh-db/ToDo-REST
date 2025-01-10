import express from 'express';
import { signup, login } from '../controllers/user.controller';
import { validateSignup, validateLogin, handleValidationErrors } from '../middlewares/validate.middleware';

const router = express.Router();

router.post('/signup', validateSignup, handleValidationErrors, signup); 
router.post('/login', validateLogin, handleValidationErrors, login);

export default router;