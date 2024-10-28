const mongoose = require('mongoose');

const lecturerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  surnName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  address: {
    Nationality: {type: String, required: true},
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  hireDate: {
    type: Date,
    default: Date.now, 
  },
  isActive: {
    type: Boolean,
    default: true, 
  },
  qualifications: [{
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    yearObtained: { type: Number, required: true },
  }],

});

module.exports = mongoose.model('Lecturer', lecturerSchema);
