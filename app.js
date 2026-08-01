const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'online', db: mongoose.connection.readyState });
});
  
app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT: ", process.env.PORT);
});

module.exports = app;