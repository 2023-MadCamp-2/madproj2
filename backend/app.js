const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();

// MongoDB 연결 설정
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB 연결 에러:', error);
  }
}

connectMongoDB();

// Middleware 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 설정
const signupRouter = require('./routes/auth/signup');
app.use('/auth', signupRouter);

const loginRouter = require('./routes/auth/login');
app.use('/auth', loginRouter);

const checkRouter = require('./routes/auth/checkNickname');
app.use('/auth', checkRouter);

const findUserRouter = require('./routes/auth/user');
app.use('/auth', findUserRouter);

const updateTokenRouter = require('./routes/auth/token');
app.use('/auth', updateTokenRouter);

const contactRouter = require('./routes/contact/contact');
app.use('/contact', contactRouter);

const historyRouter = require('./routes/history/history');
app.use('/history', historyRouter);

const chatRouter = require('./routes/chat/chat');
app.use('/chat', chatRouter);



// 에러 핸들러 설정
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});


// 포트 설정
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;