const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/userRouter");

// initialize app as server
const app = express();

// configure dotenv
dotenv.config();

// using cookie parser for cookies , json for JSON payload and urlencoded for form submission
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// for testing node server and mongodb connection
app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'online', db: mongoose.connection.readyState });
});
  
// user routers for signup and login
app.use("/api", userRouter);

// to listen (running) server on defined port
app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT: ", process.env.PORT);
});

module.exports = app;