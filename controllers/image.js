import Image from '../models/image.js';

export const createImage = async (req, res) => {
	const { title, picture, userId, courseId } = req.body;
	const newImage = new Image({
		title,
		picture,
		userId,
		courseId,
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

export const getImagesByCourse = async (req, res) => {
	const images = await Image.find({
		courseId: req.params.courseId,
	});
	res.status(200).json({
		message: 'Fetched images successfully',
		images,
	});
};

export const deleteImage = async (req, res) => {
	const { imageId } = req.params;
	const image = await Image.findByIdAndDelete(imageId);
	if (!image) {
		res.status(404).json({
			message: 'Image not found',
		});
	}
	res.status(200).json({
		message: 'Deleted image successfully',
		image,
	});
};
