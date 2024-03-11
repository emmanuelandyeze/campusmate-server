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
	groupId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group',
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
	replyMessage: {
		type: Object,
	},
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
