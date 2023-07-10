const express = require('express');
const auth = express.Router();
const authRouter = require('./auth');

auth.use((req, res, next) => {
  console.log("API for auth");
  next();
});

auth.use('/', authRouter);

module.exports = auth;