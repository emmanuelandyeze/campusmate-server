import express from 'express';
const router = express.Router();
import {
	createTask,
	getTask,
	getTasks,
	getUserTasks,
	updateTask,
	deleteTask,
	completedTask,
} from '../controllers/task.js';

router.post('/create-task', createTask);
router.get('/get-task/:id', getTask);
router.get('/get-tasks', getTasks);
router.get('/get-user-tasks/:userId', getUserTasks);
router.put('/update-task/:id', updateTask);
router.delete('/delete-task/:id', deleteTask);
router.put('/completed-task/:id', completedTask);

export default router;
