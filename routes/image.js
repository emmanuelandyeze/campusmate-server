import express from 'express';
const router = express.Router();

import {
	createImage,
	deleteImage,
	getImagesByUser,
} from '../controllers/image.js';

router.post('/create-image', createImage);
router.get('/get-images-by-user/:userId', getImagesByUser);
router.delete('/delete-image/:imageId', deleteImage);

export default router;
