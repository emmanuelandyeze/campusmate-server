import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	picture: String,
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
