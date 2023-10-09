import mongoose from 'mongoose';

const outlineSchema = new mongoose.Schema({
	courseName: {
		type: String,
		required: true,
	},
	modules: [
		{
			title: {
				type: String,
				required: true,
			},
			lessons: [
				{
					title: {
						type: String,
						required: true,
					},
					content: String,
				},
			],
		},
	],
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
	},
});

const Outline = mongoose.model('Outline', outlineSchema);

export default Outline;
