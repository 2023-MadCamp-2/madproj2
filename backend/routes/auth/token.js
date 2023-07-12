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


console.log("API for Token");

router.post('/token', async (req, res) => {
console.log('Token update request received');
  try {
    const { token, nickname } = req.body;
    // 사용자 업데이트
    const result = await client.db().collection('users').updateOne({ nickname }, { $set: { token } });
    if (result.modifiedCount !== 1) {
      throw new Error(`Cannot update token for user: ${nickname}`);
    }

    res.status(200).json({ message: 'Token updated' });
  } catch (error) {
    console.error('Token update 에러:', error);
    res.status(500).json({ message: 'Error occurred during token update' });
  }
});

  
module.exports = router;
