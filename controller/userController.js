const User = require("../model/userSchema");
const { validationResult } = require("express-validator");

const signupUser = async function(req,res){
    try {
        const { userName, email, mobile, password, userType } = req.body;
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: "User already registered" });
        };
        const newUser = await new User({ userName, email, mobile, password, userType });
        newUser.save();
        return res.status(201).json({message: "User Created Successfully !!"})
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error !!" })
    }
}


const loginUser = async function(req,res) {
    try {
        const errors = validationResult(req);
        if (errors.not().isEmpty()) {
            res.status(422).json({errors: errors.array()})
        };
        
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: "User Not Found!!" });
        };

        const isMatch = await User.isValidatePassword(password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Password!!" })
        };

        return res.status(200).json({ message: "login successfully"});

    } catch (error) {
        console.error('Login failed:', error.message);
    }
};

module.exports = { signupUser, loginUser };