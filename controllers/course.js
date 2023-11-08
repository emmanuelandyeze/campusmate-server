import Course from '../models/course.js';
import User from '../models/user.js';

export const createCourse = async (req, res) => {
	const {
		courseTitle,
		courseCode,
		faculty,
		department,
		courseDescription,
		courseUnit,
		prerequisite,
		courseTimes,
	} = req.body;
	const newCourse = new Course({
		courseTitle,
		courseCode,
		faculty,
		department,
		courseDescription,
		courseUnit,
		prerequisite,
		courseTimes,
	});
	const result = await newCourse.save();
	res.status(201).json({
		message: 'Created course successfully',
		course: result,
	});
};

export const getCourses = async (req, res) => {
	const courses = await Course.find({});
	res.status(200).json({
		message: 'Fetched courses successfully',
		courses,
	});
};

export const getCourse = async (req, res) => {
	const course = await Course.findById(req.params.id);
	res.status(200).json({
		message: 'Fetched course successfully',
		course,
	});
};

export const updateCourse = async (req, res) => {
	const course = await Course.findById(req.params.id);
	if (course) {
		course.courseTitle = req.body.courseTitle;
		course.courseCode = req.body.courseCode;
		course.faculty = req.body.faculty;
		course.department = req.body.department;
		course.courseDescription = req.body.courseDescription;
		course.courseUnit = req.body.courseUnit;
		course.prerequisite = req.body.prerequisite;
		course.courseTimes = req.body.courseTimes;
		const updatedCourse = await course.save();
		res.status(200).json({
			message: 'Updated course successfully',
			course: updatedCourse,
		});
	} else {
		res.status(404).json({
			message: 'Course not found',
		});
	}
};

export const deleteCourse = async (req, res) => {
	const course = await Course.findById(req.params.id);
	if (course) {
		await course.remove();
		res.status(200).json({
			message: 'Deleted course successfully',
		});
	} else {
		res.status(404).json({
			message: 'Course not found',
		});
	}
};

export const addCourseToUser = async (req, res) => {
	const { userId } = req.params; // Get user and course IDs from the URL parameters
	const { courseId } = req.body; // Get course ID from the request body

	try {
		// Find the user and course by their respective IDs
		const user = await User.findById(userId);
		const course = await Course.findById(courseId);

		if (!user || !course) {
			return res.status(404).json({
				message: 'User or course not found',
			});
		}
		console.log(user.courses);

		// Check if the course is already in the user's list
		const isCourseAlreadyAdded = user.courses.some(
			(item) =>
				item._id === course._id &&
				item.courseCode === course.courseCode,
		);
        
        console.log(isCourseAlreadyAdded);

		if (isCourseAlreadyAdded) {
			return res.status(400).json({
				message: 'Course is already added to the user',
			});
		}

		await User.findByIdAndUpdate(
			user._id,
			{ $addToSet: { courses: course } },
			{ new: true },
		);

		res.status(200).json({
			message: 'Added course to user successfully',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Internal server error',
		});
	}
};

export const removeCourseFromUser = async (req, res) => {
	const { userId, courseId } = req.body;
	const user = await User.findById(userId);
	const course = await Course.findById(courseId);
	if (user && course) {
		await User.findByIdAndUpdate(
			user._id,
			{ $pull: { courses: course } },
			{ new: true },
		);
		res.status(200).json({
			message: 'Removed course successfully',
		});
	} else {
		res.status(404).json({
			message: 'User or course not found',
		});
	}
};

export const getUserCourses = async (req, res) => {
	const user = await User.findById(req.params.userId);
	if (user) {
		res.status(200).json({
			message: 'Fetched courses successfully',
			courses: user.courses,
		});
	} else {
		res.status(404).json({
			message: 'User not found',
		});
	}
};
