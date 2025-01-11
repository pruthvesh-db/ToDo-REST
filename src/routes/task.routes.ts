import express from 'express';
import { createTask, readTasks, updateTask, deleteTask } from '../controllers/task.controller';
import { validateTask, handleValidationErrors } from '../middlewares/taskValidate.middleware';



const router = express.Router();

router.post('/create',validateTask, handleValidationErrors, createTask);
router.get('/read', readTasks);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

export default router;