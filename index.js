import express from 'express';

const app = express();

import 'dotenv/config';

app.use(express.json());

import connectDB from './utils/connectMongo.js';

import courseRoute from './routes/courseRoute.js';
import userRoute from './routes/userRoute.js';

connectDB();

import BookModel from './models/book.model.js';

app.use('/', courseRoute);
app.use('/api/v1/users', userRoute);

app.get('/api/v1/books/:id', async (req, res) => {
	try {
		const data = await BookModel.findById(req.params.id);

		if (data) {
			return res.status(200).json({
				msg: 'Ok',
				data,
			});
		}

		return res.status(404).json({
			msg: 'Not Found',
		});
	} catch (error) {
		return res.status(500).json({
			msg: error.message,
		});
	}
});

app.put('/api/v1/books/:id', async (req, res) => {
	try {
		const { name, author, price, description } = req.body;
		const { id } = req.params;

		const data = await BookModel.findByIdAndUpdate(
			id,
			{
				name,
				author,
				price,
				description,
			},
			{ new: true },
		);

		return res.status(200).json({
			msg: 'Ok',
			data,
		});
	} catch (error) {
		return res.status(500).json({
			msg: error.message,
		});
	}
});

app.delete('/api/v1/books/:id', async (req, res) => {
	try {
		await BookModel.findByIdAndDelete(req.params.id);
		return res.status(200).json({
			msg: 'Ok',
		});
	} catch (error) {
		return res.status(500).json({
			msg: error.message,
		});
	}
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log('Server is running on port ' + PORT);
});
