const express = require("express");
const dotenv = require("dotenv");

const { mongodbConnect } = require("./db_con/db");

dotenv.config();

const app = express();

mongodbConnect(process.env.MONGO_URI + process.env.DB_NAME);
app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT: ", process.env.PORT);
});