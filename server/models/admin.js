const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminDetails: {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    secretkey: {type: String , required: true}
  },
  candidateReview: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
