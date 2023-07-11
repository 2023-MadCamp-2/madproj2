const express = require('express');
const auth = express.Router();
const signupRouter = require('./signup');
const loginRouter = require('./login');
const checkNickname = require('./checkNickname');
const findUsername = require('./user');

auth.use((req, res, next) => {
  console.log("API for auth");
  next();
});

auth.use('/signup', signupRouter);
auth.use('/login', loginRouter);
auth.use('/checkNickname', checkNickname);
auth.use('/findUsername', findUsername);

module.exports = auth;