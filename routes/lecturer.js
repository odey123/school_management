const express = require('express');
const router = express.Router();
const lecturer = require('../controllers/lecturer');


router.post('/create-course', lecturer.createCourse);
router.patch('/update-course/:courseId', lecturer.updateCourse);
router.delete('/delete-course/:courseId', lecturer.deleteCourse);
router.get('/view-student/:courseId/students', lecturer.viewCourseStudents);
router.post('/upload-materials/:courseId/material', lecturer.uploadCourseMaterial);

module.exports = router;
