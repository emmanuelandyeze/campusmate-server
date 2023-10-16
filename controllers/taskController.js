import Task from '../models/taskModel.js';

const createTask = async (req, res) => {
	try {
		const { userId, title, description, time, colour } =
			req.body;

		// Create a new task
		const task = new Task({
			userId,
			title,
			description,
			time,
			colour,
		});

		// Save the task to the database
		const savedTask = await task.save();

		res.status(201).json(savedTask);
	} catch (error) {
		console.error('Error creating task:', error);
		res
			.status(500)
			.json({ error: 'Internal Server Error' });
	}
};

const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.status(200).json(tasks);
	} catch (error) {
		console.error('Error fetching tasks:', error);
		res
			.status(500)
			.json({ error: 'Internal Server Error' });
	}
};

const getUserTasks = async (req, res) => {
	try {
		const userId = req.params.userId;

		// Find tasks for the specified user
		const tasks = await Task.find({ userId });

		res.json(tasks);
	} catch (error) {
		console.error('Error fetching tasks:', error);
		res
			.status(500)
			.json({ error: 'Internal Server Error' });
	}
};

const taskCompleted = async (req, res) => {
	try {
		const taskId = req.params.taskId;
		const { completed } = req.body;

		// Find the task by ID
		const task = await Task.findById(taskId);

		if (!task) {
			return res
				.status(404)
				.json({ error: 'Task not found' });
		}

		// Toggle the completion status
		task.completed = !completed;

		// Save the updated task
		const updatedTask = await task.save();

		res.json(updatedTask);
	} catch (error) {
		console.error('Error updating task:', error);
		res
			.status(500)
			.json({ error: 'Internal Server Error' });
	}
};
export {
	createTask,
	getTasks,
	getUserTasks,
	taskCompleted,
};
