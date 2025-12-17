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
        required: true
    },
    dept:{
        type: String,
    },
    age:{
        type: Number,
    }
});

const StudentModel = mongoose.model('students', StudentSchema);
module.exports = StudentModel;
