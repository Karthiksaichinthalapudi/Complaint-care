const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Create a new message
router.post('/', async (req, res) => {
  try {
    const { name, message, complaintId } = req.body;
    const newMessage = new Message({ name, message, complaintId });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all messages for a complaint
router.get('/:complaintId', async (req, res) => {
  try {
    const messages = await Message.find({ complaintId: req.params.complaintId }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 