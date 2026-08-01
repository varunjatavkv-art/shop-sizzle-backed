const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRouter = require("./routes/userRouter");

dotenv.config();

app.use(express.urlencoded())

app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'online', db: mongoose.connection.readyState });
});
  
app.use("/api", userRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT: ", process.env.PORT);
});

module.exports = app;