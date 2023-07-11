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


console.log("API for User");

// Express.js 예제 코드
router.get('/user', async (req, res) => {
    try {
      const { nickname } = req.query;
  
      // 데이터베이스에서 nickname을 통해 회원 정보 검색
      const user = await client.db().collection('users').findOne({ nickname });
  
      if (user) {
        // 회원 정보 반환
        res.json({ name: user.name });
      } else {
        // 회원 정보가 없는 경우
        res.status(404).json({ message: '회원 정보가 없습니다.' });
      }
    } catch (error) {
      console.error('회원 정보 불러오기 에러:', error);
      res.status(500).json({ message: 'Error occurred while fetching user information' });
    }
});

// users.js
// 토큰 저장 라우트

// // 토큰 저장 라우트
// router.post('/token', async (req, res) => {
//   try {
//     const { token, nickname } = req.body;
//     await client.db().collection('users').updateOne(
//       { nickname },
//       { $set: { token } },
//       { upsert: true }
//     );
//     res.status(201).json({ message: 'Token saved' });
//   } catch (error) {
//     console.error('Token save 에러:', error);
//     res.status(500).json({ message: 'Error occurred during token save' });
//   }
// });
// token 엔드포인트
router.post('/token', async (req, res) => {
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
