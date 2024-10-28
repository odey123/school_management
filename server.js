const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');
require('dotenv/config');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');
const lecturerRoutes = require('./routes/lecturer')
const app = express();
const PORT = process.env.PORT || 4000; // Use environment variable or default to 5000

// Middleware
app.use(cors());
app.use(express.json()); // Body-parser is now built into Express

// Route setup

app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/lecturer', lecturerRoutes);

startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('Database connection failed:', error);
        process.exit(1);
    }
};

startServer();
