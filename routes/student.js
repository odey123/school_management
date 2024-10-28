const express = require('express');
const { 
    loginStudent, 
    viewAllCourses, 
    registerForCourse, 
    viewRegisteredCourses, 
    removeRegisteredCourse 
} = require('../controllers/student'); // Import each function individually

const router = express.Router();

router.post('/login-student', loginStudent);
router.get('/view-courses', viewAllCourses);
router.post('/register-course/:courseId', registerForCourse);
router.get('/registered-courses', viewRegisteredCourses);
router.delete('/remove-course/:courseId', removeRegisteredCourse);

module.exports = router;
