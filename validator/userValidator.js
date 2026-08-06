const { body } = require('express-validator');
const User = require("../models/userSchema");

const loginUserValidator = [
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('email', 'Email must between 6 to 15 character long').isLength({ min:6, max:15 }),
];

const registerUserValidator = [
    body('userName', 'User Name is Required').not().isEmpty(),
    body('userName', 'User Name must between 3 to 10 character long').isLength({ min:3, max:10 }),
    body('email', 'Email is Required').not().isEmpty(),
    body('email', 'Email must be a valid').isEmail().normalizeEmail(),
    body('email', 'Email must between 6 to 15 character long').isLength({ min:6, max:15 }),
    body('mobile', 'Mobile is Required').not().isEmpty(),
    body('mobile', 'Mobile must be 10 character long').isLength({ min:10, max:10 }),
    body('password', 'Password is Required').not().isEmpty(),
    body('password', 'Password should be atleast 6 character long').isLength({ min:6 }),
];

module.exports = { loginUserValidator, registerUserValidator}
