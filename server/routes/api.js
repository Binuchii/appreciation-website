const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// Get all messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        const count = await Message.countDocuments();
        res.json({ messages, count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a new message
router.post('/messages', async (req, res) => {
    const message = new Message({
        message_content: req.body.message
    });

    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
