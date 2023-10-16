// models/task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	time: {
		type: Date, // Assuming you want to store time as a Date object
	},
	completed: {
		type: Boolean,
		default: false, // Set to true if the task is completed by default
	},
	colour: {
		type: String,
		default: '#ffffff', // Default color, you can set any default color
	},
	// You can add more fields as needed
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
