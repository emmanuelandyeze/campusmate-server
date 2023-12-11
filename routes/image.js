import express from 'express';
const router = express.Router();

import {
	createImage,
	deleteImage,
	getImagesByUser,
	getImagesByCourse,
} from '../controllers/image.js';

router.post('/create-image', createImage);
router.get('/get-images-by-user/:userId', getImagesByUser);
router.delete('/delete-image/:imageId', deleteImage);
router.get(
	'/get-images-by-course/:courseId',
	getImagesByCourse,
);

export default router;
