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

// 친구 추가 라우트
router.post('/add', async (req, res) => {
  try {
    const { name, nickname } = req.body;
    // 친구 추가 로직 구현
    await client.db().collection('contacts').insertOne({ name, nickname });
    res.status(200).json({ message: 'Contact added successfully' });
  } catch (error) {
    console.error('Add contact 에러:', error);
    res.status(500).json({ message: 'Error occurred while adding contact' });
  }
});

module.exports = router;
