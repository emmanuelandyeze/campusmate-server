import express from 'express';
import 'dotenv/config';
import './models/db.js';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import noteRouter from './routes/note.js';

import User from './models/user.js';

const app = express();

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

app.get('/', (req, res) => {
	res.json({
		success: true,
		message: 'Welcome to backend zone!',
	});
});

app.get('/test', (req, res) => {
	res.send('Hello world');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log('Server is running on port ' + PORT);
});
