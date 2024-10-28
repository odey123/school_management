const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String, 
    required: true,
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin'], 
    default: 'admin',
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  isActive: {
    type: Boolean,
    default: true, 
  },
  
});

module.exports = mongoose.model('Admin', adminSchema);
