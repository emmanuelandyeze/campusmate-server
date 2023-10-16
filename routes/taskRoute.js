// routes/tasks.js
import express from 'express';
const router = express.Router();
import {
	createTask,
	getUserTasks,
	taskCompleted,
} from '../controllers/taskController.js';

// POST /tasks - Create a new task
router.post('/', createTask);
router.get('/:userId', getUserTasks);
router.put('/:taskId', taskCompleted);

export default router;
