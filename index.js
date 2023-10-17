import express from 'express';
import 'dotenv/config';
import './models/db.js';
import userRouter from './routes/user.js';

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

// const test = async (email, password) => {
//   const user = await User.findOne({ email: email });
//   const result = await user.comparePassword(password);
//   console.log(result);
// };

// test('niraj@email.com', 'niraj12');

app.get('/api', (req, res) => {
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
