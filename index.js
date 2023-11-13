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

io.on('connection', (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on('disconnect', () => {
		socket.disconnect();
		console.log('🔥: A user disconnected');
	});
});

app.get('/test', (req, res) => {
	res.send('Hello world');
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
	console.log('Server is running on port ' + PORT);
});
