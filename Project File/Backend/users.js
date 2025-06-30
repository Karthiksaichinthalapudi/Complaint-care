const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all users (protected)
router.get('/', auth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get user by ID (protected)
router.get('/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Delete user (protected)
router.delete('/:id', auth, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User deleted' });
});

// Get all agents (protected)
router.get('/agents', auth, async (req, res) => {
  const agents = await User.find({ userType: 'Agent' });
  res.json(agents);
});

// TEMP: Get all users (unprotected, for debugging)
router.get('/all-debug', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router; 