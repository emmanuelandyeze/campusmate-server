import express from 'express';
const router = express.Router();

import {
	createImage,
	getImagesByUser,
} from '../controllers/image.js';

router.post('/create-image', createImage);
router.get('/get-images-by-user/:userId', getImagesByUser);

export default router;
