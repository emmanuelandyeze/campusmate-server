import express from 'express';
const router = express.Router();

import {
	createNote,
	getNote,
	getNotes,
	updateNote,
	deleteNote,
	getNotesByTask,
	getNotesByUser,
} from '../controllers/note.js';

router.post('/create-note', createNote);
router.get('/get-note/:id', getNote);
router.get('/get-notes', getNotes);
router.get('/get-user-notes/:userId', getNotesByUser);
router.put('/update-note/:id', updateNote);
router.delete('/delete-note/:id', deleteNote);
router.get('/get-notes-by-task/:taskId', getNotesByTask);
router.get('/get-notes-by-user/:userId', getNotesByUser);

export default router;
