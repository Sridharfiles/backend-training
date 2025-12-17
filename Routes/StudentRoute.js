const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const StudentModel = require('../models/studentmodel');


// const student = [
// {
//     id: 1,
//     name: "sridhar",
//     email: "sridhar@gmail.com",
//     dept: "CSE"
// },
// {
//     id: 2,
//     name: "john",
//     email: "john@gmail.com",
//     dept: "ECE"
// },
// {
//     id: 3,
//     name: "smith",
//     email: "smith@gmail.com",
//     dept: "MECH"
// }]

function checkname(req, res, next) {
    if (true) {
        next();
    } else{
        throw new Error("name not");
    }
}

router.get('/get', (req, res) => {
    res.send("get method")
    setTimeout(() => {
        console.log("5 seconds")
    }, 5000);
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await StudentModel.findByIdAndDelete(id);
        res.json({message: "student deleted", data: deleted.name});
    } catch (error) {
        res.json({message:error.message});
    }
});

router.put('/replace/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body
    const index = student.findIndex((item) => {
        return item.id == id
    })
    student[index] = {name};
    res.send(student);
});

router.get('/students',async (req, res) => {
    try {
        const students = await StudentModel.find({});
        res.send(students);
    } catch (error) {
        res.send(error);
    }
    // one route one response
});

router.post('/add', async (req, res) => {
    try{
        const{name, email, dept, age} = req.body;
        const newstudent = new StudentModel({
            name, 
            email, 
            dept,
            age
        });
        await newstudent.save();
        res.send(newstudent);
    } catch (error) {
        res.send(error);
    }
});

    // const newstudent = {id, name, email, dept};
    // student.push(newstudent);


module.exports = router;