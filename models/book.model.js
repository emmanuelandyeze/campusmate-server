import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema(
	{
		name: {
			type: String,
			require: true,
		},
		author: String,
		price: {
			type: Number,
			require: true,
		},
		description: String,
	},
	{
		timestamps: true,
	},
);

const BookModel = mongoose.model('Book', bookSchema);

export default BookModel;
