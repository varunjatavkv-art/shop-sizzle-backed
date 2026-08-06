const express = require("express");;
const { loginUserValidator, registerUserValidator } = require("../validator/userValidator");
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();
// route for signup with express validator
router.post("/user/signup", registerUserValidator, signupUser);
// route for login with express validation
router.post("/user/login", loginUserValidator, loginUser);

module.exports = router;