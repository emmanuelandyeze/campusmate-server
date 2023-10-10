import express from 'express';
import {
	createCourse,
	editCourse,
	getCourse,
} from '../controllers/courseController.js';
import verifyToken from '../utils/verifyToken.js';
const router = express.Router();

router.get('/api/v1/courses', verifyToken, getCourse);
router.post('/api/v1/courses', verifyToken, createCourse);
router.put('/api/v1/courses/:id', verifyToken, editCourse);

export default router;
