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
    const { myName, friendName, friendNickname } = req.body;

    // 상대 닉네임이 users DB에 존재하는지 확인
    const existingUser = await client.db().collection('users').findOne({ nickname: friendNickname });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 친구 추가 로직 구현
    await client.db().collection('contacts').insertOne({ myName, friendName, friendNickname });
    res.status(200).json({ message: 'Contact added successfully' });
  } catch (error) {
    console.error('Add contact 에러:', error);
    res.status(500).json({ message: 'Error occurred while adding contact' });
  }
});

// 친구 목록 불러오기
router.get('/', async (req, res) => {
  try {
    const { myName } = req.query;

    // 내 이름에 해당하는 친구 정보 조회
    const contacts = await client.db().collection('contacts').find({ myName }).toArray();
    res.status(200).json({ contacts });
  } catch (error) {
    console.error('친구 목록 조회 에러:', error);
    res.status(500).json({ message: '친구 목록 조회에 실패했습니다.' });
  }
});

// 친구 삭제
router.delete('/:friendNickname', async (req, res) => {
  try {
    const { myName } = req.query;
    const { friendNickname } = req.params;

    // 내 이름과 상대 닉네임에 해당하는 친구 정보 삭제
    await client.db().collection('contacts').deleteOne({ myName, friendNickname });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('친구 삭제 에러:', error);
    res.status(500).json({ message: 'Error occurred while deleting contact' });
  }
});


module.exports = router;
