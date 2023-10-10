// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
	const token = req.header('Authorization');

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Access denied. Token not provided',
		});
	}

	try {
		const decoded = jwt.verify(token, 'your_jwt_secret');
		req.userId = decoded.userId;
		next();
	} catch (error) {
		res
			.status(401)
			.json({ success: false, message: 'Invalid token' });
	}
};

export default verifyToken;
