import mongoose from 'mongoose';

const courseTimesSchema = new mongoose.Schema({
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
	},
	times: [
		{
			day: String, // e.g. 'Monday'
			startTime: String, // e.g. '09:00'
			endTime: String, // e.g. '10:30'
		},
	],
});

const TimeModel = mongoose.model('Time', courseTimesSchema);

export default TimeModel;
