const express = require('express');
const auth = express.Router();
const signupRouter = require('./signup');
const loginRouter = require('./login');

auth.use((req, res, next) => {
  console.log("API for auth");
  next();
});

auth.use('/signup', signupRouter);
auth.use('/login', loginRouter);

module.exports = auth;

// const express = require('express');
// const auth = express.Router();
// const authRouter = require('./auth');

// auth.use((req, res, next) => {
//   console.log("API for auth");
//   next();
// });

// auth.use('/', authRouter);

// module.exports = auth;