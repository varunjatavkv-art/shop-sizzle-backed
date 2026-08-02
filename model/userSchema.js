const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// user schema
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength:3,
        maxlength:10,
    },
    email: {
        type: String,
        required: true,
        minlength:6,
        maxlength: 15,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        minlength:10,
        maxlength:10
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    userType: {
        type: String,
        enum: ["0", '1'],
        comments: "0 - Client 1 - Admin"
    }
},{
    timestamps: true
});

// pre method to hash password before form submission (registration)
userSchema.pre("save" , async function (next){ 
    try {
        // check if paasword is already modified or not
        if(this.password.isModified) return next;
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash the password
        this.password = await bcrypt.hash(this.password, salt);
        next;
    } catch (error) {
        console.log(error);
        
        next;
    }
});

// validating password with bcrypt compare method
userSchema.methods.isValidatePassword = async function (password){
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        return res.status(400).json({ message: "Invalid Password"});
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;