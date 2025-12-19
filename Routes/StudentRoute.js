const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const router = express.Router();
const StudentModel = require('../models/studentmodel');
const auth = require('../Middleware/auth');



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

// signup route
const custompassword = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
}
router.post("/signup", async (req, res) => {
    try {
        const {name, email, password, dept, age, role} = req.body;
        if(!validator.isEmail(email)) {
            return res.json("Invalid email");
        }
        if(!validator.isStrongPassword(password, custompassword)) {
            
            return res.json("password is not strong");
        } 
        const hasedpassword = await bcrypt.hash(password, 10);
        const signupstudent = new StudentModel({
            name,
            email,
            password: hasedpassword,
            dept,
            age,
            role
        });
        await signupstudent.save();
        res.json({messsage: "student registered successfully", data: signupstudent})
    } catch (error) {
        res.json({message: error.message})
    }
});

router.post("/login", async (req, res) => {
    try {
         const {email, password} =  req.body;
         const user = await StudentModel.findOne({email: email});
        //  if(user.role !== "admin") {
        //     return res.json("student not allowed");
        //  }
         const verifypassword = await bcrypt.compare(password, user.password);
         console.log(verifypassword);
        //  const ispasswordcorrect = user.password == password;
        //  console.log(ispasswordcorrect);
         if(verifypassword === false){
            return res.json("invalid credentials");
         }
         const token = await jwt.sign({userId: user._id}, "BACKEND2468")
         console.log(token);
         res.cookie('token', token);

         res.json(`message: ${user.name} login successfully`);
    } catch (error) {
        res.json({message: error.message});
    }
});

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
        if (!deleted) {
            return res.json({message: "student not found"});
        }
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

router.get('/students', async (req, res) => {
    try {
        const students = await StudentModel.find({});
        if (!students) {
            return res.send({message:"no students found"});
        }
        res.send({message: "all students", data: students});
    } catch (error) {
            res.send({message: error.message});
    }
});     // one route one response

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

router.get("/student/:id", async (req, res) => {
    try {
        // const loggeduser = req.user;

        // console.log(loggeduser);
        const {id} = req.params;
 
        // if(loggeduser != id) {
        //    return res.json("access denied");
        // }

        // if (loggeduser.role !== "admin") {
        //     return res.json("accessssss denied");
        // }

        const student = await StudentModel.findById(id);
        res.json({message:"student found", data: student});
    } catch (error) {
        res.json({message:error.message});
    }
});

router.get("/studentcourse/:SID", async (req, res) => {
    try {
        const {SID} = req.params;
        const data = await StudentModel.findById(SID).populate('AssignedCourses');
        res.json({message: "student courses", data: data});
    } catch (error) {
        res.json({message: error.message});
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, dept, age} = req.body;
        const updated = await StudentModel.findByIdAndUpdate(id, {name, email, dept, age});
        res.json({message: "updated successfully", data:updated});
    } catch (error) {
        res.json({message:error.message});
    }
});

    // const newstudent = {id, name, email, dept};
    // student.push(newstudent);

module.exports = router;