const User = require("../models/userSchema");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signupUser = async function(req,res){
    try {
        // validating request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()})
        };
        // destructuring request body
        const { userName, email, mobile, password, userType } = req.body;

        // finding already registered user for checking
        const user = await User.findOne({ email });
        if(user){
            return res.status(422).json({ message: "User already registered" });
        };

        // creating a new user
        const newUser = new User({ userName, email, mobile, password, userType });
        await newUser.save();

        // sending response as json with status 201 - created
        return res.status(201).json({message: "User Created Successfully !!"})
    } catch (error) {
        // logging for debugging and sending response with status 500 - Internal Server Error
        console.log("Registration Failed: ",error.message);
        return res.status(500).json({ message: "Internal Server Error !!" })
    }
}


const loginUser = async function(req,res) {
    try {
         // validating request
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
             return res.status(422).json({errors: errors.array()})
         };
        
        // destructuring request body
        const { email, password } = req.body;

        // checking if user is registered or not
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ message: "Invalid email or password" });
        };

        // matching password
        const isMatch = await user.isValidatePassword(password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid email or password" })
        };

        // generating token with jwt sign
        const token = jwt.sign({ user: user.userName , id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // setting cookies for browser
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 3600000 
        })

        // sending response with status code 200 - success 
        return res.status(200).json({ message: "login successfully", token});

    } catch (error) {
        // logging for debugging and sending response with status 500 - Internal Server Error
        console.error('Login failed:', error.message);
        return res.status(500).json({ message: "Internal Server Error !!" })
    }
};

module.exports = { signupUser, loginUser };