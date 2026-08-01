const express = require("express");
const { mongodbConnect } = require("./db_con/db");

const app = express();
const PORT = 8080;

mongodbConnect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2')
app.listen(PORT, () => {
    console.log("Server is running on PORT: ", PORT);
});