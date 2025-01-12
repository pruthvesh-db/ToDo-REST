import express from 'express';
import { createTask, readTasks, updateTask, deleteTask } from '../controllers/task.controller';
import { validateTask, handleValidationErrors } from '../middlewares/taskValidate.middleware';



const router = express.Router();

router.post('/',validateTask, handleValidationErrors, createTask);
router.get('/', readTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;