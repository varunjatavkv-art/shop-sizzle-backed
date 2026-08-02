const User = require("../model/userSchema");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signupUser = async function(req,res){
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()})
        };
        const { userName, email, mobile, password, userType } = req.body;
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: "User already registered" });
        };
        const newUser = await new User({ userName, email, mobile, password, userType });
        newUser.save();
        return res.status(201).json({message: "User Created Successfully !!"})
    } catch (error) {
        console.log("Registration Failed: ",error.message);
        res.status(500).json({ message: "Internal Server Error !!" })
    }
}


const loginUser = async function(req,res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()})
        };
        
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: "User Not Found!!" });
        };

        const isMatch = await user.isValidatePassword(password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Password!!" })
        };

        const token = jwt.sign({ user: user.userName }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 3600000 
        })

        return res.status(200).json({ message: "login successfully"});

    } catch (error) {
        console.error('Login failed:', error.message);
        return res.status(500).json({ message: "Internal Server Error !!" })
    }
};

module.exports = { signupUser, loginUser };