const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
   username: {
    type: String,
    required: [true, 'Please provide your name'],
    unique: true
   },
   email:{
    type: String,
    required: [true, 'Please provide your email'],
    unique: true
   },
   password:{
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 8
   }
});

const Auth = mongoose.model('Auth', userSchema);
module.exports = Auth;
