const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

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

console.log("API for Login");

// Login 라우트
router.post('/login', async (req, res) => {
  try {
    const { nickname, password } = req.body;
    console.log(nickname, password);
    // 사용자 검증
    const user = await client.db().collection('users').findOne({ nickname, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid nickname or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login 에러:', error);
    res.status(500).json({ message: 'Error occurred during login' });
  }
});

module.exports = router;