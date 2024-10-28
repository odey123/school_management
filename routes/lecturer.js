const express = require('express');
const router = express.Router();
const lecturer = require('../controllers/lecturer');

// Route to create a course
router.post('/create-course', lecturer.createCourse);

// Route to update course details
router.patch('/course/:courseId', lecturer.updateCourse);

// Route to delete a course
router.delete('/course/:courseId', lecturer.deleteCourse);

// Route to view students in a course
router.get('/course/:courseId/students', lecturer.viewCourseStudents);

// Route to upload materials
router.post('/course/:courseId/material', lecturer.uploadCourseMaterial);

module.exports = router;
