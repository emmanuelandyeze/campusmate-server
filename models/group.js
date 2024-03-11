import mongoose, { mongo } from 'mongoose';

const groupSchema = new mongoose.Schema({
	name: String,
	color: String,
	users: [String],
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
