const express = require('express');
const app = express();
app.use(express.json());
const bookRoute = require('./Routes/bookRoute');
const userRoute = require('./Routes/userRoute');

app.use('/', bookRoute, userRoute);

app.listen(3000, () => {{
    console.log("server is running...")
}});