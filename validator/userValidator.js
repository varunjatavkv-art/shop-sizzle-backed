const {body} = require('express-validator');
const User = require("../model/userSchema");

const loginUserValidator = [
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('Email', 'Email must between 6 to 15 character long').isLength({ min:6, max:15 }),
];

const registerUserValidator = [
    body('userName', 'User Name is Required').not().isEmpty(),
    body('userName', 'User Name must between 3 to 10 character long').isLength({ min:3, max:10 }),
    body('Email', 'Email is Required').not().isEmpty(),
    body('Email', 'Email must be a valid').isEmail().normalizeEmail()
    .custom(async (value) => {
      // Query your database to find an existing user
      const user = await User.findOne({ email: value });
      if (user) {
        // Reject the promise if the email is taken
        throw new Error('E-mail already in use.');
      }
      // Return true if the email is unique
      return true;
    }),
    body('Email', 'Email must between 6 to 15 character long').isLength({ min:6, max:15 }),
    body('Mobile', 'Mobile is Required').not().isEmpty(),
    body('Mobile', 'Mobile must be 10 character long').isLength({ min:10, max:10 }),
    body('Password', 'Password is Required').not().isEmpty(),
    body('Password', 'Password should be atleast 6 character long').isLength({ min:6 }),
];

module.exports = { loginUserValidator, registerUserValidator}
