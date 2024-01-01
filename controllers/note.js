import Note from '../models/note.js';

export const getNotes = async (req, res) => {
	const notes = await Note.find({});
	res.status(200).json({
		message: 'Fetched notes successfully',
		notes,
	});
};

export const getNote = async (req, res) => {
	const note = await Note.findById(req.params.id);
	res.status(200).json({
		message: 'Fetched note successfully',
		note,
	});
};

export const createNote = async (req, res) => {
	const {
		title,
		description,
		userId,
		colour,
		taskId,
		courseId,
		is_private,
	} = req.body;
	const newNote = new Note({
		title,
		description,
		userId,
		colour,
		taskId,
		courseId,
		is_private,
	});
	const result = await newNote.save();
	res.status(201).json({
		message: 'Created note successfully',
		note: result,
	});
};

export const updateNote = async (req, res) => {
	const note = await Note.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		},
	);
	res.status(200).json({
		message: 'Updated note successfully',
		note,
	});
};

export const deleteNote = async (req, res) => {
	await Note.findByIdAndDelete(req.params.id);
	res.status(200).json({
		message: 'Deleted note successfully',
	});
};

export const getNotesByTask = async (req, res) => {
	const notes = await Note.find({
		taskId: req.params.id,
	});
	res.status(200).json({
		message: 'Fetched notes successfully',
		notes,
	});
};

export const getNotesByUser = async (req, res) => {
	const notes = await Note.find({
		userId: req.params.userId,
	});
	res.status(200).json({
		message: 'Fetched notes successfully',
		notes,
	});
};

export const getNotesByCourse = async (req, res) => {
	const notes = await Note.find({
		courseId: req.params.courseId,
	});
	res.status(200).json({
		message: 'Fetched notes successfully',
		notes,
	});
};
