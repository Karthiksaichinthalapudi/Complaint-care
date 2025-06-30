const express = require('express');
const AssignedComplaint = require('../models/AssignedComplaint');
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all complaints assigned to a specific agent
router.get('/agent/:agentId', auth, async (req, res) => {
  try {
    const assigned = await AssignedComplaint.find({ agentId: req.params.agentId }).populate('complaintId');
    // Flatten the response to include complaint details directly
    const complaints = assigned.map(a => ({
      ...a.complaintId._doc,
      status: a.status,
      agentName: a.agentName
    }));
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign a complaint to an agent and update complaint status
router.post('/', auth, async (req, res) => {
  try {
    const { agentId, complaintId, agentName } = req.body;
    // Create the assignment
    const assigned = new AssignedComplaint({ agentId, complaintId, status: 'assigned', agentName });
    await assigned.save();
    // Update the complaint status
    await Complaint.findByIdAndUpdate(complaintId, { status: 'assigned' });
    res.status(201).json({ message: 'Complaint assigned', assigned });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 