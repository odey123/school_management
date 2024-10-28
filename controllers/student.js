const Student = require('../model/student');
const Course = require('../model/course');

// Controller to log in a student
const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        const isMatch = (student.password === password); // This should ideally use bcrypt.compare for security
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Student successfully logged in' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in student', error: error.message });
    }
};

// Controller to view all available courses
const viewAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
};

// Controller to register for a particular course
const registerForCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if student is already enrolled
        if (course.studentsEnrolled.includes(studentId)) {
            return res.status(400).json({ message: 'Student already registered for this course' });
        }

        // Add student to the course and update student document
        course.studentsEnrolled.push(studentId);
        await course.save();

        await Student.findByIdAndUpdate(studentId, { $addToSet: { courses: courseId } }); // Ensure no duplicates
        res.status(200).json({ message: 'Course registration successful', courseName: course.courseName });
    } catch (error) {
        res.status(500).json({ message: 'Error registering for course', error: error.message });
    }
};

// Controller to view registered courses for a student
const viewRegisteredCourses = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId).populate('courses');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ registeredCourses: student.courses });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching registered courses', error: error.message });
    }
};

// Controller to remove a registered course
const removeRegisteredCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        // Remove course from student and update course document
        const student = await Student.findByIdAndUpdate(
            studentId,
            { $pull: { courses: courseId } },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await Course.findByIdAndUpdate(courseId, { $pull: { studentsEnrolled: studentId } });
        res.status(200).json({ message: 'Course successfully removed from registered courses' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing registered course', error: error.message });
    }
};

module.exports = {
    loginStudent,
    viewAllCourses,
    registerForCourse,
    viewRegisteredCourses,
    removeRegisteredCourse
};
