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

// chat.js
const axios = require('axios');

// 메시지 전송 라우트
router.post('/send', async (req, res) => {
  try {
    const { from, to, message } = req.body;
    // 사용자 유효성 검사
    const from_valid = await client.db().collection('users').findOne({nickname : from})
    const to_valid = await client.db().collection('users').findOne({nickname : to})
        
    if(!from_valid || !to_valid){
      return res.status(401).json({ message: 'Invalid users' });
    }
    
    // 메시지 생성
    const newMessage = { from, to, message, date: new Date() };
    await client.db().collection('messages').insertOne(newMessage);
    
    // 수신자의 푸시 토큰 찾기
    const recipient = await client.db().collection('users').findOne({ nickname: to });
    if (!recipient || !recipient.token) {
      throw new Error(`No push token found for user: ${to}`);
    }

    // 알림 발송
    const response = await axios.post('https://exp.host/--/api/v2/push/send', {
      to: recipient.token,
      sound: 'default',
      title: '삐삐',
      body: `${from} 79가 ${message} 보냄 8282 확인부탁!`,
      data: { from, message },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    res.status(201).json({ message: 'Message sent' });
  } catch (error) {
    console.error('Message send 에러:', error);
    res.status(500).json({ message: 'Error occurred during message send' });
  }
});


// 메시지 받기 라우트
router.get('/receive/:nickname', async (req, res) => {
  try {
    const { nickname } = req.params;
    const messages = await client.db().collection('messages').find({ to: nickname }).toArray();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Message receive 에러:', error);
    res.status(500).json({ message: 'Error occurred during message receive' });
  }
});


router.get('/', async (req, res) => {
    try {
      const { from, to } = req.query; // from, to를 query parameter로 받아옵니다.
    /*
      if (!from || !to) {
        return res.status(400).json({ message: 'Both "from" and "to" must be provided' });
      }
    */
   // 사용자 검증
      const from_valid = await client.db().collection('users').findOne({nickname : from})
      const to_valid = await client.db().collection('users').findOne({nickname : to})
      
      if(!from_valid || !to_valid){
        return res.status(401).json({ message: 'Invalid users' });
      }
    // 검증클리어!
      const chats = await client
        .db()
        .collection('messages')//collection('chats')
        .find({ $or: [ { from, to }, { from: to, to: from } ] }) // from과 to가 서로 역전된 경우도 고려합니다.
        .toArray();
  
      res.status(200).json(chats);
    } catch (error) {
      console.error('Error occurred while fetching chats:', error);
      res.status(500).json({ message: 'Error occurred while fetching chats' });
    }
  });




// 나랑 톡한사람들 목록 받아오기
router.get('/partners/:nickname', async (req, res) => {
  const nickname = req.params.nickname;
  try {
    const messages = await client.db().collection('messages').find({ $or: [ { from: nickname }, { to: nickname } ] }).toArray();
    let partners = new Set();
    for (let message of messages) {
      partners.add(message.from === nickname ? message.to : message.from);
    }
    res.status(200).json({ partners: Array.from(partners) });
  } catch (error) {
    console.error('Error occurred while fetching chat partners:', error);
    res.status(500).json({ message: 'Error occurred while fetching chat partners' });
  }
  });
  
module.exports = router;