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


router.get('/:nickname', async (req, res) => {
    const nickname = req.params.nickname;

    try {

        // 검증 
        const nickname_valid = await client.db().collection('users').findOne({nickname : nickname})
        if(!nickname_valid){
            return res.status(401).json({ message: 'Invalid users' });
        }
        ///    
    
        const messages = await client.db().collection('messages').find({
            $or: [
                { from: nickname },
                { to: nickname }
            ]
        }).sort({timestamp: -1}).toArray();

        let users = new Set();
        messages.forEach(message => {
            if(message.from === nickname) {
                users.add(message.to);
            } else {
                users.add(message.from);
            }
        });

        let result = [];
        users.forEach(user => {
            let lastMessage = messages.find(m => m.from === user || m.to === user);
            result.push({user: user, lastMessage: lastMessage});
        });

        res.json(result);

    } catch (error) {
        //console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the chat history.' });
    }
});



module.exports = router;