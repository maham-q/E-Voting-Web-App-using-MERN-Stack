const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  candidate: {
    type: String,
    unique: false
  },
  partyName: {
    type: String,
    unique: false
  }
});
const Voter = mongoose.model('Voter', voteSchema);
module.exports = Voter;





