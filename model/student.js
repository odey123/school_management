const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    surnName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
    },
    address: {
        Nationality: {type: String, required: true},
        street: { type: String },
        city: { type: String },
        state: { type: String },
        
    },
     guardian:{
        fullname: { type: String, required: true},
        contactNumber: { type: Number},
        relationship: {type: String},
        address: {type: String},
        
     },
     department: {
        type: String
     },
     isActive: {
        type: Boolean,
        default: true,
     }
});

module.exports = mongoose.model('Student', studentSchema)