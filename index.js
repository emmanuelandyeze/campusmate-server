import express from 'express';
import 'dotenv/config';
import './models/db.js';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import noteRouter from './routes/note.js';
import courseRouter from './routes/course.js';
import imageRouter from './routes/image.js';
import documentRouter from './routes/document.js';
import cors from 'cors';
import http, { Server } from 'http';

import User from './models/user.js';
import Message from './models/message.js';
import Group from './models/group.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// app.use((req, res, next) => {
//   req.on('data', chunk => {
//     const data = JSON.parse(chunk);
//     req.body = data;
//     next();
//   });
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(noteRouter);
app.use(courseRouter);
app.use(imageRouter);
app.use(documentRouter);
app.use(cors());

const messageChangeStream = Message.watch();

messageChangeStream.on('change', (change) => {
	console.log('Change detected:', change);
});

// Set up Socket.IO
io.on('connection', (socket) => {
	console.log('A user connected');

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

app.get('/', (req, res) => {
	res.json({
		success: true,
		message: 'Welcome to backend zone!',
	});
});

//👇🏻 Generates random string as the ID
const generateID = () =>
	Math.random().toString(36).substring(2, 10);

let chatRooms = [
	//👇🏻 Here is the data structure of each chatroom
	// {
	//  id: generateID(),
	//  name: "Novu Hangouts",
	//  messages: [
	//      {
	//          id: generateID(),
	//          text: "Hello guys, welcome!",
	//          time: "07:50",
	//          user: "Tomer",
	//      },
	//      {
	//          id: generateID(),
	//          text: "Hi Tomer, thank you! 😇",
	//          time: "08:50",
	//          user: "David",
	//      },
	//  ],
	// },
];

//endpoint to post Messages and store it in the backend
app.post('/messages', async (req, res) => {
	try {
		const {
			user,
			courseId,
			groupId,
			messageType,
			messageText,
			replyMessage,
			userId,
		} = req.body;

		const newMessage = new Message({
			user,
			courseId,
			groupId,
			messageType,
			text: messageText,
			createdAt: new Date(),
			replyMessage,
			userId,
		});

		await newMessage.save();
		res
			.status(200)
			.json({ message: 'Message sent Successfully' });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: 'Internal Server Error' });
	}
});

//endpoint to fetch the messages between users in the chatRoom
app.get('/messages/:courseId', async (req, res) => {
	try {
		const { courseId } = req.params;

		const messages = await Message.find({
			courseId: courseId,
		}).populate('user', '_id fullname');

		res.json(messages);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: 'Internal Server Error' });
	}
});

app.get('/group-messages/:groupId', async (req, res) => {
	try {
		const { groupId } = req.params;

		const messages = await Message.find({
			groupId: groupId,
		}).populate('user', '_id fullname');

		res.json(messages);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: 'Internal Server Error' });
	}
});

//endpoint to delete the messages!
app.post('/deleteMessages', async (req, res) => {
	try {
		const { messages } = req.body;

		if (!Array.isArray(messages) || messages.length === 0) {
			return res
				.status(400)
				.json({ message: 'invalid req body!' });
		}

		await Message.deleteMany({ _id: { $in: messages } });

		res.json({ message: 'Message deleted successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server' });
	}
});

//endpoint to delete single message
app.delete('/messages/:id', async (req, res) => {
	try {
		const { id } = req.params;

		await Message.findByIdAndDelete(id);

		res.json({ message: 'Message deleted successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server' });
	}
});

// Create a Group
app.post('/groups', async (req, res) => {
	try {
		const { name, color, users, admin } = req.body;
		const group = new Group({ name, color, users, admin });
		await group.save();
		res.status(201).json(group);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Add User to a Group
app.patch('/groups/:id/add-user', async (req, res) => {
	try {
		const { id } = req.params;
		const { user } = req.body;
		const group = await Group.findById(id);
		if (!group) throw new Error('Group not found');
		group.users.push(user);
		await group.save();
		res.json(group);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Remove User from a Group
app.patch('/groups/:id/remove-user', async (req, res) => {
	try {
		const { id } = req.params;
		const { user } = req.body;
		const group = await Group.findById(id);
		if (!group) throw new Error('Group not found');
		group.users = group.users.filter((u) => u !== user);
		await group.save();
		res.json(group);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.get('/groups/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		const groups = await Group.find({ users: userId });
		res.json(groups);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// get users in a group

app.get('/groups/:groupId/users', async (req, res) => {
	try {
		const { groupId } = req.params;
		// Find the group document by ID
		const group = await Group.findById(groupId);

		if (!group) {
			console.log('Group not found');
			return;
		}

		// Get the IDs of users in the group
		const userIds = group.users;

		// Find users with the retrieved IDs
		const users = await User.find({
			_id: { $in: userIds },
		});

		res.json({ success: true, users });
	} catch (error) {
		console.error('Error fetching users in group:', error);
	}
});

app.get('/test', (req, res) => {
	res.send('Hello world');
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
	console.log('Server is running on port ' + PORT);
});
