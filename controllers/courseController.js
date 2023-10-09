import Course from '../models/courseModel.js';

const getCourse = async (req, res) => {
	const {
		limit = 5,
		orderBy = 'name',
		sortBy = 'asc',
		keyword,
	} = req.query;
	let page = +req.query?.page;

	if (!page || page <= 0) page = 1;

	const skip = (page - 1) * +limit;

	const query = {};

	if (keyword)
		query.name = { $regex: keyword, $options: 'i' };

	try {
		const data = await Course.find(query)
			.skip(skip)
			.limit(limit)
			.sort({ [orderBy]: sortBy });
		const totalItems = await Course.countDocuments(query);
		return res.status(200).json({
			msg: 'Ok',
			data,
			totalItems,
			totalPages: Math.ceil(totalItems / limit),
			limit: +limit,
			currentPage: page,
		});
	} catch (error) {
		return res.status(500).json({
			msg: error.message,
		});
	}
};

const createCourse = async (req, res) => {
	const {
		name,
		code,
		units,
		description,
		department,
		semester,
		faculty,
		time,
		outline,
	} = req.body;
	const course = new Course({
		name,
		code,
		units,
		description,
		department,
		semester,
		faculty,
		time,
		outline,
	});
	try {
		const data = await course.save();
		return res.status(201).json({
			msg: 'Created',
			data,
		});
	} catch (error) {
		return res.status(500).json({
			msg: error.message,
		});
	}
};

const editCourse = async (req, res) => {
	const {
		name,
		code,
		units,
		description,
		department,
		semester,
		faculty,
		time,
		outline,
	} = req.body;
	const { id } = req.params;
	try {
		const data = await Course.findByIdAndUpdate(
			id,
			{
				name,
				code,
				units,
				description,
				department,
				semester,
				faculty,
				time,
				outline,
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
};

export { getCourse, createCourse, editCourse };
