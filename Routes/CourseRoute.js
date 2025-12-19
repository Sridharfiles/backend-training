const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../Middleware/auth');


const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,       
    }
});

const CourseModel = mongoose.model('courses', CourseSchema);


// const course = [
//     {
//         id: 1,
//         title: "data structures",
//     },
//     {
//         id: 2,
//         title: "operating systems",
//     },
//     {
//         id: 3,
//         title: "database management",
//     }
// ];

router.get('/courses', async (req, res) => {
    try {
        const courses = await CourseModel.find({});
        res.send(courses);
    } catch (error) {
        res.send(error);
    }
});

router.post('/addcourse', async (req, res) => {
    try {
        const course = new CourseModel(req.body);
        await course.save();
        res.send("course added");
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;