const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const StudentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    dept:{
        type: String,
    },
    age:{
        type: Number,
    },
    role:{
        type: String,
        default: ["student", "admin"],
        required: true
    },
    AssignedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
    }]
},
{timestamps: true});

const StudentModel = mongoose.model('students', StudentSchema);
module.exports = StudentModel;
