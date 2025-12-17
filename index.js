const express = require('express');
const app = express();
app.use(express.json());
const studentRoute = require('./Routes/StudentRoute');
const courseRoute = require('./Routes/CourseRoute');
const connectDB = require('./Connection/connect');


app.use('/', courseRoute,studentRoute);
// app.use('/', (req, res)=>{
//     res.send("Welcome to Express JS");
// });

connectDB().then(() => {
    app.listen(5000, () => {
        console.log("server is running on port 5000");
    });
})

