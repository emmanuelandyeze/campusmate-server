import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import sharp from 'sharp';
import cloudinary from '../helper/imageUpload.js';
import passport from '../middlewares/googleAuth.js';

export const createUser = async (req, res) => {
	const { fullname, email, password } = req.body;
	const isNewUser = await User.isThisEmailInUse(email);
	if (!isNewUser)
		return res.json({
			success: false,
			message: 'This email is already in use, try sign-in',
		});
	const user = await User({
		fullname,
		email,
		password,
	});
	await user.save();
	res.json({ success: true, user });
};

export const userSignIn = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user)
		return res.json({
			success: false,
			message: 'User not found, with the given email!',
		});

	const isMatch = await user.comparePassword(password);
	if (!isMatch)
		return res.json({
			success: false,
			message: 'email / password does not match!',
		});

	const token = jwt.sign(
		{ userId: user._id },
		process.env.JWT_SECRET,
		{
			expiresIn: '30d',
		},
	);

	let oldTokens = user.tokens || [];

	if (oldTokens.length) {
		oldTokens = oldTokens.filter((t) => {
			const timeDiff =
				(Date.now() - parseInt(t.signedAt)) / 1000;
			if (timeDiff < 86400) {
				return t;
			}
		});
	}

	await User.findByIdAndUpdate(user._id, {
		tokens: [
			...oldTokens,
			{ token, signedAt: Date.now().toString() },
		],
	});

	const userInfo = {
		fullname: user.fullname,
		email: user.email,
		avatar: user.avatar ? user.avatar : '',
		userId: user._id,
		courses: user.courses,
		school: user.school,
		token: user.token,
	};

	res.json({ success: true, user: userInfo, token });
};

export const getAllUsers = async (req, res) => {
	const users = await User.find();
	res.json({ success: true, users });
};

export const uploadProfile = async (req, res) => {
	const { user } = req;
	if (!user)
		return res.status(401).json({
			success: false,
			message: 'unauthorized access!',
		});

	try {
		const result = await cloudinary.uploader.upload(
			req.file.path,
			{
				public_id: `${user._id}_profile`,
				width: 500,
				height: 500,
				crop: 'fill',
			},
		);

		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{ avatar: result.url },
			{ new: true },
		);
		res.status(201).json({
			success: true,
			message: 'Your profile has updated!',
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'server error, try after some time',
		});
		console.log(
			'Error while uploading profile image',
			error.message,
		);
	}
};

export const signOut = async (req, res) => {
	if (req.headers && req.headers.authorization) {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			return res.status(401).json({
				success: false,
				message: 'Authorization fail!',
			});
		}

		const tokens = req.user.tokens;

		const newTokens = tokens.filter(
			(t) => t.token !== token,
		);

		await User.findByIdAndUpdate(req.user._id, {
			tokens: newTokens,
		});
		res.json({
			success: true,
			message: 'Sign out successfully!',
		});
	}
};

export const updateUserSchool = async (req, res) => {
	const userId = req.params.userId;

	const user = await User.findById(userId);

	if (!user) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized access',
		});
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{ school: req.body.school },
			{ new: true },
		);

		res.status(200).json({
			success: true,
			message: 'School updated successfully',
			user: updatedUser,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export const updateUserToken = async (req, res) => {
	const userId = req.params.userId;

	const user = await User.findById(userId);

	if (!user) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized access',
		});
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{ token: req.body.token },
			{ new: true },
		);

		res.status(200).json({
			success: true,
			message: 'Token updated successfully',
			user: updatedUser,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export const googleSignIn = passport.authenticate(
	'google',
	{
		scope: ['profile', 'email'],
	},
);

export const googleSignInCallback = passport.authenticate(
	'google',
	{
		failureRedirect: '/auth/google/failure', // Redirect if authentication fails
		successRedirect: '/auth/google/success', // Redirect if authentication succeeds
	},
);

