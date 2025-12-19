const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const StudentModel = require('../models/studentmodel');

const auth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        console.log(token);
        if (!token) {
            return res.json("no token found");
        }

        const decoded = await jwt.verify(token, "BACKEND2468");
        console.log(decoded);
        if (!decoded) {
            return res.json("no student found");
        }

        const {userId} = decoded;
        const userdata = await StudentModel.findById(userId);
        console.log(userdata);
        if (!userdata) {
            return res.json("no user found");
        }
        req.user = userId;
        req.role = userdata.role;
        next();


    } catch (error) {
        res.json({message: error.message});
    }
}

exports = module.exports = auth;