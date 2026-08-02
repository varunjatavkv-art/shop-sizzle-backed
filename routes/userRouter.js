const express = require("express");;
const { loginUserValidator, registerUserValidator } = require("../validator/userValidator");
const { loginUser, signupUser } = require("../controller/userController");

const router = express.Router();

router.post("/user/signup", registerUserValidator, signupUser)
router.post("/user/login", loginUserValidator, loginUser);

module.exports = router;