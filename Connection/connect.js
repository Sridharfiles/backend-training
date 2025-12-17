const mongoose = require('mongoose');
const express = require('express');
const app = express();

async function connectDB() {
    await mongoose.connect("mongodb://localhost:27017/backendtech").then(() => {
        console.log("Connected DB");
    }).catch((error) => {
        console.log("error", error);
    });
}

module.exports = connectDB;