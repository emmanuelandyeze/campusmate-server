import express from 'express';

const router = express.Router();

import {
	createCourse,
	getCourses,
	getCourse,
	updateCourse,
	deleteCourse,
	addCourseToUser,
	removeCourseFromUser,
	getUserCourses,
} from '../controllers/course.js';

router.post('/create-course', createCourse);
router.get('/get-courses', getCourses);
router.get('/get-course/:id', getCourse);
router.put('/update-course/:id', updateCourse);
router.delete('/delete-course/:id', deleteCourse);
router.put('/add-course-to-user/:userId', addCourseToUser);
router.put(
	'/remove-course-from-user',
	removeCourseFromUser,
);
router.get('/get-user-courses/:userId', getUserCourses);

export default router;
