import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const taskSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	description: { type: String, required: true },
	deadline: { type: Date, required: false },
	color: { type: String, required: false },
	checklist: [
		{
			description: { type: String, required: true },
			completed: { type: Boolean, default: false },
		},
	],
	completed: { type: Boolean, default: false },
});

const Task = model('Task', taskSchema);

export default Task;
