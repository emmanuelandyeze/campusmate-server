import express from 'express';
import {
	createTask,
	updateTaskChecklist,
	markTaskCompleted,
	markChecklistItemCompleted,
	deleteTask,
	getAllTasksForUser,
	markTaskNotCompleted,
} from '../controllers/task.js';

const router = express.Router();

router.post('/tasks', createTask);
router.patch(
	'/tasks/:userId/:taskId/checklist',
	updateTaskChecklist,
);
router.patch(
	'/tasks/:userId/:taskId/completed',
	markTaskCompleted,
);
router.patch(
	'/tasks/:userId/:taskId/uncompleted',
	markTaskNotCompleted,
);
router.patch(
	'/tasks/:userId/:taskId/checklist/:itemId/completed',
	markChecklistItemCompleted,
);

router.delete('/tasks/:userId/:taskId', deleteTask);
router.get('/tasks/:userId', getAllTasksForUser);

export default router;
