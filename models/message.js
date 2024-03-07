import mongoose, { mongo } from 'mongoose';

const messageSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
	},
	messageType: {
		type: String,
		enum: ['text'],
	},
	text: String,
	imageUrl: String,
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
