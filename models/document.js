import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		document: String,
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Document = mongoose.model('Document', documentSchema);

export default Document;
