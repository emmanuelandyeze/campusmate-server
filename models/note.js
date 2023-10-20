import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	colour: {
		type: String,
	},
	taskId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task',
	},
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
