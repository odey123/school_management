const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: { 
        type: String, 
        required: true 
    },
    courseCode: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String 
    },
    credits: { 
        type: Number, 
        required: true 
    },
    department: { 
        type: String 
    },
    lecturerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Lecturer',
        required: true 
    },
    studentsEnrolled: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Student' 
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
