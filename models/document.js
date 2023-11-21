import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	doc: String,
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Document = mongoose.model('Document', documentSchema);

export default Document;
