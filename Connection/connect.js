const mongoose = require('mongoose');
const express = require('express');
const app = express();

async function connectDB() {
    await mongoose.connect("mongodb+srv://backendtech:Qwertyuiop@cluster0.4uav0nv.mongodb.net/backendtech").then(() => {
        console.log("Connected DB");
    }).catch((error) => {
        console.log("error", error);
    });
}

module.exports = connectDB;