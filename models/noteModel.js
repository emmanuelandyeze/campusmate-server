import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	content: {
		type: String,
		required: true,
		unique: true,
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
	},
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
