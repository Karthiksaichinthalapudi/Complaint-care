const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  name: String,
  message: String,
  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true }
});
module.exports = mongoose.model('Message', messageSchema); 