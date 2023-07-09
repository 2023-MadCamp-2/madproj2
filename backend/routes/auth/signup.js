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

// Signup 라우트
router.post('/signup', async (req, res) => {
  try {
    const { name, nickname, password } = req.body;

    // nickname 중복 체크
    const existingUser = await client.db().collection('users').findOne({ nickname });
    if (existingUser) {
      return res.status(409).json({ message: 'Nickname already exists' });
    }

    // 사용자 생성
    const newUser = { name, nickname, password };
    await client.db().collection('users').insertOne(newUser);
    res.status(201).json({ message: 'Signup Success' });
  } catch (error) {
    console.error('Signup 에러:', error);
    res.status(500).json({ message: 'Error occurred during signup' });
  }
});

module.exports = router;
