import express from 'express';
const router = express.Router();

import {
	createDocument,
	deleteDocument,
	getDocumentsByUser,
} from '../controllers/document.js';

router.post('/create-document', createDocument);
router.get(
	'/get-documents-by-user/:userId',
	getDocumentsByUser,
);
router.delete('/delete-document/:docId', deleteDocument);

export default router;
