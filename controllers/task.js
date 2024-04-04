import Task from '../models/task.js';
import { v4 as uuidv4 } from 'uuid';

export const createTask = async (req, res) => {
	const {
		userId,
		description,
		deadline,
		color,
		checklist,
	} = req.body;

	try {
		const newTask = new Task({
			userId,
			description,
			deadline,
			color,
			checklist: checklist?.map((item) => ({
				id: uuidv4(),
				description: item.description,
				completed: false,
			})),
		});

		const savedTask = await newTask.save();
		res.status(201).json(savedTask);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Controller to update task with checklist for a specific user
export const updateTaskChecklist = async (req, res) => {
	try {
		const { userId } = req.params;
		const { taskId, checklist } = req.body;

		const task = await Task.findOneAndUpdate(
			{ _id: taskId, userId },
			{ checklist },
			{ new: true },
		);

		if (!task) {
			return res
				.status(404)
				.json({ message: 'Task not found for the user' });
		}

		res.json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Controller to mark task as completed for a specific user
export const markTaskCompleted = async (req, res) => {
	try {
		const { userId } = req.params;
		const { taskId } = req.body;

		const task = await Task.findOneAndUpdate(
			{ _id: taskId, userId },
			{ completed: true },
			{ new: true },
		);

		if (!task) {
			return res
				.status(404)
				.json({ message: 'Task not found for the user' });
		}

		res.json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const markTaskNotCompleted = async (req, res) => {
	try {
		const { userId } = req.params;
		const { taskId } = req.body;

		const task = await Task.findOneAndUpdate(
			{ _id: taskId, userId },
			{ completed: false },
			{ new: true },
		);

		if (!task) {
			return res
				.status(404)
				.json({ message: 'Task not found for the user' });
		}

		res.json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Controller to mark checklist item as completed for a specific user
export const markChecklistItemCompleted = async (
	req,
	res,
) => {
	try {
		const { userId } = req.params;
		const { taskId, itemId } = req.body;

		const task = await Task.findOne({
			_id: taskId,
			userId,
		});

		if (!task) {
			return res
				.status(404)
				.json({ message: 'Task not found for the user' });
		}

		const item = task.checklist.id(itemId);
		if (!item) {
			return res
				.status(404)
				.json({ message: 'Checklist item not found' });
		}

		item.completed = true;
		await task.save();

		res.json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};



// Controller to delete task for a specific user
export const deleteTask = async (req, res) => {
	try {
		const { userId, taskId } = req.params;

		const task = await Task.findOneAndDelete({
			_id: taskId,
			userId,
		});

		if (!task) {
			return res
				.status(404)
				.json({ message: 'Task not found for the user' });
		}

		res.json({ message: 'Task deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Controller to get all tasks for a specific user
export const getAllTasksForUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const tasks = await Task.find({ userId });
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
