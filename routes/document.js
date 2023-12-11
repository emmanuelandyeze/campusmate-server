import express from 'express';
const router = express.Router();

import {
	createDocument,
	deleteDocument,
	getDocumentsByUser,
	getDocumentsByCourse,
} from '../controllers/document.js';

router.post('/create-document', createDocument);
router.get(
	'/get-documents-by-user/:userId',
	getDocumentsByUser,
);
router.delete('/delete-document/:docId', deleteDocument);
router.get(
	'/get-documents-by-course/:courseId',
	getDocumentsByCourse,
);

export default router;
