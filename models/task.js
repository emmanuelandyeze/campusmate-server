import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	completed: {
		type: Boolean,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	time: {
		type: Date,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	colour: {
		type: String,
		required: true,
	},
	checkList: {
		type: Array,
	},
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
