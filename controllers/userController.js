import User from '../models/userModel.js';

const createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json({
			msg: 'User created successfully',
			user,
		});
	} catch (error) {
		res.status(400).json({
			msg: error.message,
		});
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user || user.password !== password) {
			return res.status(401).json({
				success: false,
				message: 'Invalid credentials',
			});
		}

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user._id },
			'your_jwt_secret',
			{ expiresIn: '1h' },
		);
		res.json({ success: true, token });
	} catch (error) {
		res
			.status(500)
			.json({ success: false, message: 'Login failed' });
	}
};

const getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json({
			msg: 'Users fetched successfully',
			users,
		});
	} catch (error) {
		res.status(400).json({
			msg: error.message,
		});
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json({
			msg: 'User fetched successfully',
			user,
		});
	} catch (error) {
		res.status(400).json({
			msg: error.message,
		});
	}
};

const editUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true },
		);
		res.status(200).json({
			msg: 'User updated successfully',
			user,
		});
	} catch (error) {
		res.status(400).json({
			msg: error.message,
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(
			req.params.id,
		);
		res.status(200).json({
			msg: 'User deleted successfully',
			user,
		});
	} catch (error) {
		res.status(400).json({
			msg: error.message,
		});
	}
};

export {
	createUser,
	loginUser,
	getUsers,
	getUser,
	editUser,
	deleteUser,
};
