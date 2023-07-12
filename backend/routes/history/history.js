const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

// MongoDB 연결 설정

const uri  = process.env.MONGODB_URI;
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

// 메시지 전송 라우트
router.post('/send', async (req, res) => {
  try {
    const { from, to, message } = req.body;
    // 메시지 생성
    const newMessage = { from, to, message, date: new Date() };
    await client.db().collection('messages').insertOne(newMessage);
    res.status(201).json({ message: 'Message sent' });
  } catch (error) {
    console.error('Message send 에러:', error);
    res.status(500).json({ message: 'Error occurred during message send' });
  }
});