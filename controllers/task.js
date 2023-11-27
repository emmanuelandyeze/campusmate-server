import Task from '../models/task.js';

export const createTask = async (req, res) => {
	const {
		name,
		description,
		completed,
		time,
		userId,
		colour,
		checkList,
	} = req.body;
	const newTask = new Task({
		name,
		description,
		completed: false,
		time,
		userId,
		colour,
		checkList,
	});
	const result = await newTask.save();
	res.status(201).json({
		message: 'Created task successfully',
		task: result,
	});
};

export const getTasks = async (req, res) => {
	const tasks = await Task.find({});
	res.status(200).json({
		message: 'Fetched tasks successfully',
		tasks,
	});
};

export const getTask = async (req, res) => {
	const task = await Task.findById(req.params.id);
	res.status(200).json({
		message: 'Fetched task successfully',
		task,
	});
};

export const getUserTasks = async (req, res) => {
	const tasks = await Task.find({
		userId: req.params.userId,
	});
	res.status(200).json({
		message: 'Fetched tasks successfully',
		tasks,
	});
};

export const updateTask = async (req, res) => {
	const task = await Task.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		},
	);
	res.status(200).json({
		message: 'Updated task successfully',
		task,
	});
};

export const deleteTask = async (req, res) => {
	const task = await Task.findByIdAndDelete(req.params.id);
	res.status(200).json({
		message: 'Deleted task successfully',
		task,
	});
};

export const completedTask = async (req, res) => {
	const task = await Task.findById(req.params.id);

	task.completed = !task.completed;

	await task.save();

	res.status(200).json({
		message: 'Toggled task completion',
		task,
	});
};

export const updateTaskChecklist = async (req, res) => {
	const { checklistId, completed } = req.body;
	const { taskId } = req.params;

	try {
		// Find the task by ID
		const task = await Task.findById(taskId);

		if (!task) {
			return res
				.status(404)
				.json({ message: 'Task not found' });
		}

		// Find the checklist item within the task's checklists array
		const checklistItem = task.checkList.find(
			(item) => item.id.toString() === checklistId,
		);

		if (!checklistItem) {
			return res
				.status(404)
				.json({ message: 'Checklist item not found' });
		}

		// Update the completed status of the checklist item
		checklistItem.completed = completed;

		// Save the updated task document
		await task.save();

		res.status(200).json({
			message: 'Checklist item updated successfully',
			task,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
