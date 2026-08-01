const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        length:10
    },
    Email: {
        type: String,
        required: true,
        length:10
    },
    mobile: {
        type: String,
        required: true,
        length:10
    },
    password: {
        type: String,
        required: true,
    },
    UserType: {
        type: String,
        enum: ["0", '1'],
        comments: "0 - Client 1- Admin"
    }
},{
    timestamps: true
});

module.exports = userSchema;