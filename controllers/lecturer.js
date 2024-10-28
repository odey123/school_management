
const Course = require('../model/course');


const createCourse = async (req, res) => {
    try {
        
        const { courseName, courseCode, description, credits, department, lecturerId } = req.body;

        
        const newCourse = new Course({
            courseName,
            courseCode, 
            description,
            credits, 
            department,
            lecturerId 
        });

     
        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error: error.message });
    }
};


const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const updates = req.body;
        const course = await Course.findByIdAndUpdate(courseId, updates, { new: true });
        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error: error.message });
    }
};


const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        await Course.findByIdAndDelete(courseId);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error: error.message });
    }
};


const viewCourseStudents = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate('studentsEnrolled');
        res.status(200).json({ students: course.studentsEnrolled });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};

const uploadCourseMaterial = async (req, res) => {
    try {
        const { courseId } = req.params;
        res.status(200).json({ message: 'Course material uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading material', error: error.message });
    }
};

module.exports = {
    createCourse,
    updateCourse,
    deleteCourse,
    viewCourseStudents,
    uploadCourseMaterial
};
