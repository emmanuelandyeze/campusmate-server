import express from 'express';

const router = express.Router();
import {
	createUser,
	userSignIn,
	uploadProfile,
	signOut,
	updateUserSchool,
	updateUserToken,
	googleSignIn,
	googleSignInCallback,
	getAllUsers,
} from '../controllers/user.js';
import { isAuth } from '../middlewares/auth.js';
import {
	validateUserSignUp,
	userVlidation,
	validateUserSignIn,
} from '../middlewares/validation/user.js';

import multer from 'multer';

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb('invalid image file!', false);
	}
};
const uploads = multer({ storage, fileFilter });

router.post(
	'/create-user',
	validateUserSignUp,
	userVlidation,
	createUser,
);
router.post(
	'/sign-in',
	validateUserSignIn,
	userVlidation,
	userSignIn,
);
router.post('/sign-out', isAuth, signOut);
router.post(
	'/upload-profile',
	isAuth,
	uploads.single('profile'),
	uploadProfile,
);
router.get('/profile', isAuth, (req, res) => {
	if (!req.user)
		return res.json({
			success: false,
			message: 'Unauthorized access',
		});

	res.json({
		success: true,
		profile: {
			fullname: req.user.fullname,
			email: req.user.email,
			avatar: req.user.avatar ? req.user.avatar : '',
			userId: req.user._id,
			school: req.user.school,
			token: req.user.token,
		},
	});
});
router.put('/update-user-school/:userId', updateUserSchool);
router.put('/update-user-token/:userId', updateUserToken);
router.get('/auth/google', googleSignIn);
router.get('/auth/google/callback', googleSignInCallback);
router.get('/users', getAllUsers);

export default router;
