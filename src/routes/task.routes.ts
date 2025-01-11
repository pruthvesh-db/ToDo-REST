import express from 'express';
import { createTask } from '../controllers/task.controller';
import isAuthenticate from '../middlewares/auth.middleware';


const router = express.Router();

router.post('/create', createTask);

export default router;