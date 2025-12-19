const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const router = express.Router();
const auth = require('../Middleware/auth');
const StudentModel = require('../models/studentmodel');

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
        res.json({messsage: "admin registered successfully", data: signupstudent})
    } catch (error) {
        res.json({message: error.message})
    }
});

router.post("/login", async (req, res) => {
    try {
         const {email, password} =  req.body;
         const user = await StudentModel.findOne({email: email});
         if(user.role !== "admin") {
            return res.json("student not allowed");
         }
         const verifypassword = await bcrypt.compare(password, user.password);
         console.log(verifypassword);
        //  const ispasswordcorrect = user.password == password;
        //  console.log(ispasswordcorrect);
         if(verifypassword === false){
            return res.json("invalid credentials");
         }
         res.json(`message: ${user.name} login successfully`);

        const token = jwt.sign({userId: user._id}, "BACKEND2468")
        console.log(token);
        
    } catch (error) {
        res.json({message: error.message});
    }
});

router.patch('/assigncourse/:SID', async (req, res) => {
    try {
        const {SID} = req.params;
        const {courseIds} = req.body;
        const student = await StudentModel.findById(SID);
        if (!student) {
            return res.json("no students found")
        }
        const assign = await StudentModel.findByIdAndUpdate(SID, {AssignedCourses: courseIds});
        res.json({message: "courses assigned successfully", data: assign});
    } catch (error) {
        res.json({message: error.message});
    }
});

module.exports = router;