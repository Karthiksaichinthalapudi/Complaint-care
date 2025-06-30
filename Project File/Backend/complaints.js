const express = require('express');
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');
const router = express.Router();

// Create complaint (protected)
router.post('/', auth, async (req, res) => {
  // Defensive: If userId is missing, get it from the token
  if (!req.body.userId && req.user && req.user.userId) {
    req.body.userId = req.user.userId;
  }
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    console.log('Saved complaint:', complaint);
    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all complaints (protected)
router.get('/', auth, async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

// Get complaint by ID (protected)
router.get('/:id', auth, async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
  res.json(complaint);
});

// Delete complaint (protected)
router.delete('/:id', auth, async (req, res) => {
  const complaint = await Complaint.findByIdAndDelete(req.params.id);
  if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
  res.json({ message: 'Complaint deleted' });
});

module.exports = router; 