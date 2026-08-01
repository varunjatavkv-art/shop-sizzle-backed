const dotenv = require("dotenv");
const app = require('./app.js');
// app.use(express.urlencoded());
const { mongodbConnect } = require("./db_con/db");

dotenv.config();

mongodbConnect(process.env.MONGO_URI + process.env.DB_NAME);
