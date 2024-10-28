const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Student = require('../model/student');
const Lecturer = require('../model/lecturer');

// Email sending function
const sendEmail = (studentEmail, studentName, tempPassword) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS  
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: studentEmail,
        subject: 'Welcome to School Management System',
        text: `Hello ${studentName},\n\nYou have been registered in the system. Your temporary password is: ${tempPassword}\nPlease change your password upon first login.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// Function to register a student
const registerStudent = async (req, res) => {
    try {
        const { firstName, surnName, age, email, contact, address, guardian, department } = req.body;

        const tempPassword = Math.random().toString(36).slice(-8); 
        const hashedPassword = await bcrypt.hash(tempPassword, 10); 

        const student = new Student({
            firstName,
            surnName,
            age,
            email,
            password: hashedPassword, 
            contact,
            address,
            guardian,
            department
        });

        await student.save();
        sendEmail(email, `${firstName} ${surnName}`, tempPassword);

        res.status(201).json({
            message: 'Student registered successfully and credentials sent via email.',
            student: {
                firstName: student.firstName,
                surnName: student.surnName,
                age: student.age,
                email: student.email,
                contact: student.contact,
                address: student.address,
                guardian: student.guardian,
                department: student.department
            }
        });
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).json({ message: 'Error registering student', error: error.message });
    }
};

// Function to register a lecturer
const registerLecturer = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging
        const { 
            firstName, 
            surnName, 
            email, 
            phone, 
            department, 
            address, 
            hireDate, 
            qualifications 
        } = req.body;

        const existingLecturer = await Lecturer.findOne({ email });
        if (existingLecturer) {
            return res.status(400).json({ message: 'Lecturer already registered' });
        }

        const lecturer = new Lecturer({ 
            firstName, 
            surnName, 
            email, 
            phone, 
            department, 
            address, 
            hireDate, 
            qualifications 
        });
        await lecturer.save();

        res.status(201).json({ message: 'Lecturer registered successfully', lecturer });
    } catch (error) {
        console.error('Error registering lecturer:', error); // Corrected logging
        res.status(500).json({ message: 'Error registering lecturer', error: error.message });
    }
};

// Function to delete a student
const deleteStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
};

// Function to delete a lecturer
const deleteLecturer = async (req, res) => {
    try {
        const { lecturerId } = req.params;
        const deletedLecturer = await Lecturer.findByIdAndDelete(lecturerId);
        
        if (!deletedLecturer) {
            return res.status(404).json({ message: 'Lecturer not found' });
        }

        res.status(200).json({ message: 'Lecturer deleted successfully' });
    } catch (error) {
        console.error('Error deleting lecturer:', error);
        res.status(500).json({ message: 'Error deleting lecturer', error: error.message });
    }
};

module.exports = {
    registerStudent,
    registerLecturer,
    deleteStudent,
    deleteLecturer
};
