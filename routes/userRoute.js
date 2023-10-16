import express from 'express';
import {
	createUser,
	getUser,
	getUsers,
	loginUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.get('/', getUsers);

export default router;
