const Candidate = require('../models/candidate')
const voter = require('../models/voter')
const election = require('.././models/election');

const candidateController={
  applyCandidate: async (req, res) => {
    try {
      const CheckIfElectionIsInPlay = await election.findOne({ flag: true });
      if (CheckIfElectionIsInPlay) {
        return res.status(404).json({ error: 'Election is in progress. Candidate applications are not accepted at this time.' });
      }
      const { candidateName, partyName, symbol } = req.body;
      const newCandidate = new Candidate({
        applyCandidate: {
          candidateName,
          partyName,
          symbol
        }
      });
      await newCandidate.save();
      res.status(200).json({ message: 'Candidate application submitted' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Error applying for candidateship' });
    }

  },

  viewVotes: async (req, res, next) => {
    try {
      const candidatePartyName = req.query.candidatePartyName;
      const totalVotes = await voter.countDocuments({ partyName: candidatePartyName });
      res.status(200).json({ totalVotes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching total votes' });
    }
  },

  viewVoters: async (req, res, next) => {
    try {
        const voters = await voter.find();
        if (voters.length === 0) {
            return res.status(404).json({ message: "There are no people who have currently voted!" });
        }
        res.status(200).json({ voters });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching votes' });
    }
  },

  viewProfile: async (req, res, next) => {
    try {
      const partyName = req.query.partyName;
      const profile = await Candidate.findOne({ 'applyCandidate.partyName': partyName });
  
      if (!profile) {
        return res.status(404).json({ message: 'No such party exists' });
      }
      return res.status(200).json(profile.applyCandidate);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching candidate profile' });
    }
  }
};
module.exports= candidateController;