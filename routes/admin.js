const express = require('express');
const router = express.Router();
const {registerStudent, 
      registerLecturer, 
      deleteStudent, 
      deleteLecturer}  = require('../controllers/admin');


router.post('/register-student', registerStudent); 
router.post('/register-lecturer', registerLecturer);
router.delete('/delete-student/:studentId', deleteStudent);
router.delete('/delete-lecturer/:lecturerId', deleteLecturer);


module.exports = router;
