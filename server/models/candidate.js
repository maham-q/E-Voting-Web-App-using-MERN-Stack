const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  applyCandidate: {
    candidateName: String,
    partyName: String,
    symbol: String
  },
  viewProfile: {
    name: String,
    party: String,
    votes: Number,
  },
  viewVotes: {
    candidateId: mongoose.Schema.Types.ObjectId,
    totalvotes: Number,
  },
  viewVoters: {
    candidateId: mongoose.Schema.Types.ObjectId,
    name: String,
  },
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;