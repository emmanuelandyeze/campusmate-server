import Image from '../models/image.js';

export const createImage = async (req, res) => {
	const { title, picture, userId } = req.body;
	const newImage = new Image({
		title,
		picture,
		userId,
	});
	const result = await newImage.save();
	res.status(201).json({
		message: 'Uploaded image successfully',
		image: result,
	});
};

export const getImagesByUser = async (req, res) => {
	const images = await Image.find({
		userId: req.params.userId,
	});
	res.status(200).json({
		message: 'Fetched notes successfully',
		images,
	});
};
