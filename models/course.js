import mongoose from 'mongoose';

const courseTimeSchema = new mongoose.Schema({
	day: String, // e.g., "Monday", "Tuesday", etc.
	startTime: Date, // Date object for start time
	duration: String, // Date object for end time
});

const courseSchema = new mongoose.Schema(
	{
		courseTitle: {
			type: String,
			required: true,
		},
		courseCode: {
			type: String,
			required: true,
			unique: true,
		},
		faculty: String,
		department: String,
		courseDescription: String,
		courseUnit: String,
		prerequisite: String,
		courseTimes: [courseTimeSchema], // Array of courseTimeSchema objects
	},
	{
		timestamps: true,
	},
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
