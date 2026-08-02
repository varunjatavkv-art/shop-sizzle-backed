const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')
const app = express();
const userRouter = require("./routes/userRouter");

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'online', db: mongoose.connection.readyState });
});
  
app.use("/api", userRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT: ", process.env.PORT);
});

module.exports = app;