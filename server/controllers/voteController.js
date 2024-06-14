const Vote = require("../models/voter");
const Candidate = require("../models/candidate");
const Auth = require("./../models/auth");
const election = require("./../models/election");

const voteController = {
  castVote: async (req, res, next) => {
    try {
      const CheckIfElectionIsInPlay = await election.findOne({ flag: true });
      const candName = req.body.candidateName;
      const username = req.body.username;
      const existingVote = await Vote.findOne({ username });
      if (existingVote) {
        return res
          .status(400)
          .json({ message: "User has already cast a vote" });
      }

      const candidate = await Candidate.findOne({
        "applyCandidate.candidateName": candName,
      });
      const party = candidate.applyCandidate.partyName;
      console.log(party);
      const user = await Auth.findOne({ username });
      const newVote = new Vote({
        username: user.username,
        candidate: candName,
        partyName: candidate.applyCandidate.partyName,
      });
      console.log(newVote);
      await newVote.save();
      res.status(200).json({ message: "Vote saved successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error casting vote" });
    }
  },
};

module.exports = voteController;
