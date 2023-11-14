import express from 'express';
import 'dotenv/config';
import './models/db.js';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import noteRouter from './routes/note.js';
import courseRouter from './routes/course.js';
import cors from 'cors';
import http, { Server } from 'http';

import User from './models/user.js';
import Message from './models/message.js';

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
app.use(cors());

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

io.on('connection', (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on('createRoom', (roomName) => {
		socket.join(roomName);
		//👇🏻 Adds the new group name to the chat rooms array
		chatRooms.unshift({
			id: generateID(),
			roomName,
			messages: [],
		});
		//👇🏻 Returns the updated chat rooms via another event
		socket.emit('roomsList', chatRooms);
	});

	socket.on('disconnect', () => {
		socket.disconnect();
		console.log('🔥: A user disconnected');
	});
});

//endpoint to post Messages and store it in the backend
app.post('/messages', async (req, res) => {
	try {
		const { senderId, courseId, messageType, messageText } =
			req.body;

		const newMessage = new Message({
			senderId,
			courseId,
			messageType,
			message: messageText,
			timestamp: new Date(),
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
app.get(
	'/messages/:senderId/:courseId',
	async (req, res) => {
		try {
			const { senderId, courseId } = req.params;

			const messages = await Message.find({
				$or: [
					{ senderId: senderId, courseId: courseId },
					{ senderId: courseId, courseId: senderId },
				],
			}).populate('senderId', '_id name');

			res.json(messages);
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ error: 'Internal Server Error' });
		}
	},
);

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

app.get('/test', (req, res) => {
	res.send('Hello world');
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
	console.log('Server is running on port ' + PORT);
});
