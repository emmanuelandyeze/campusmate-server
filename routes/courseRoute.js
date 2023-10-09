import express from 'express';
import {
	createCourse,
	editCourse,
	getCourse,
} from '../controllers/courseController.js';
const router = express.Router();

router.get('/api/v1/courses', getCourse);
router.post('/api/v1/courses', createCourse);
router.put('/api/v1/courses/:id', editCourse);

export default router;
