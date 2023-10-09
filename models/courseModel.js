import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
		unique: true,
	},
	units: {
		type: Number,
		required: true,
	},
	department: {
		type: String,
		required: true,
	},
	faculty: {
		type: String,
		required: true,
	},
	descriptions: String,
	semester: {
		type: String,
		required: true,
	},
	time: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Time',
	},
	outline: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Outline',
	},
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
