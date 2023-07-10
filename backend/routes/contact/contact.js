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


// 친구 목록 불러오기
router.get('/', async (req, res) => {
  try {
    const { nickname } = req.query;
    // 닉네임에 해당하는 친구 정보 조회
    const contacts = await client.db().collection('contacts').find().toArray();
    res.status(200).json({ contacts });
  } catch (error) {
    console.error('친구 목록 조회 에러:', error);
    res.status(500).json({ message: '친구 목록 조회에 실패했습니다.' });
  }
});

// 친구 삭제
router.delete('/:nickname', async (req, res) => {
  try {
    const { nickname } = req.params;
    
    // 닉네임에 해당하는 친구 정보 삭제
    await client.db().collection('contacts').deleteOne({ nickname });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('친구 삭제 에러:', error);
    res.status(500).json({ message: 'Error occurred while deleting contact' });
  }
});


module.exports = router;
