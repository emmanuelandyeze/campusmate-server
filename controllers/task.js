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
