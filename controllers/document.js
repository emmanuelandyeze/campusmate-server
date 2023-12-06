import Document from '../models/document.js';

export const createDocument = async (req, res) => {
	const { title, document, userId } = req.body;
	const newImage = new Document({
		title,
		document,
		userId,
	});
	const result = await newImage.save();
	res.status(201).json({
		message: 'Uploaded document successfully',
		document: result,
	});
};

export const getDocumentsByUser = async (req, res) => {
	const documents = await Document.find({
		userId: req.params.userId,
	});
	res.status(200).json({
		message: 'Fetched documents successfully',
		documents,
	});
};

export const deleteDocument = async (req, res) => {
	const { docId } = req.params;
	const document = await Document.findByIdAndDelete(docId);
	if (!document) {
		res.status(404).json({
			message: 'Document not found',
		});
	}
	res.status(200).json({
		message: 'Deleted document successfully',
		document,
	});
};
