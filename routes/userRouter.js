const express = require("express");
const User = require("../model/userSchema");
const { loginUserValidator } = require("../validator/userValidator");
const { validationResult } = require("express-validator");

const router = express.Router();

router.post("/user/login", loginUserValidator, async function(req,res) {
    try {
        const errors = validationResult(req);
        if (errors.not().isEmpty()) {
            res.status(422).json({errors: errors.array()})
        };
        
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: "User No Found!!" });
        };

        const isMatch = await User.isValidatePassword(password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Password!!" })
        };

        return res.status(200).json({ message: "login successfully"});

    } catch (error) {
        console.error('Login failed:', error.message);
    }
});

module.exports = router;