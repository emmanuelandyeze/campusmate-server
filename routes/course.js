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
	getUserswithCourse,
	updateCourseForUser,
} from '../controllers/course.js';

router.post('/create-course', createCourse);
router.get('/get-courses', getCourses);
router.get('/get-course/:id', getCourse);
router.put('/update-course/:id', updateCourse);
router.delete('/delete-course/:id', deleteCourse);
router.put('/add-course-to-user/:userId', addCourseToUser);
router.put(
	'/remove-course-from-user/:userId',
	removeCourseFromUser,
);
router.get('/get-user-courses/:userId', getUserCourses);
router.get(
	'/get-users-with-course/:courseId',
	getUserswithCourse,
);
router.put(
	'/update-course-for-user/:userId',
	updateCourseForUser,
);

export default router;
