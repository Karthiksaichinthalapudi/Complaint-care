const mongoose = require('mongoose');
const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  comment: String,
  status: String
});
module.exports = mongoose.model('Complaint', complaintSchema); 