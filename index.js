const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const studentRoute = require('./Routes/StudentRoute');
const admin = require('./Routes/adminRoute');
const courseRoute = require('./Routes/CourseRoute');
const connectDB = require('./Connection/connect');
app.use(cookieParser());

app.use('/course', courseRoute);
app.use('/student', studentRoute);
app.use('/admin', admin);

// app.use('/', (req, res)=>{
//     res.send("Welcome to Express JS");
// });

connectDB().then(() => {
    app.listen(5000, () => {
        console.log("server is running on port 5000");
    });
})

