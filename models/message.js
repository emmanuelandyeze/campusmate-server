import mongoose, { mongo } from 'mongoose';

const messageSchema = new mongoose.Schema({
	senderId: {
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
	message: String,
	imageUrl: String,
	timeStamp: {
		type: Date,
		default: Date.now,
	},
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
