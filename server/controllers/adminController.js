const Admin = require("../models/admin");
const election = require("../models/election");
const Candidate = require("../models/candidate");
const voter = require(".././models/voter");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//helper function
const login = async (username, password, secretkey) => {
  try {
    const admin = await Admin.findOne({ "adminDetails.username": username });
    if (!admin) {
      throw new Error("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      admin.adminDetails.password
    );
    if (!passwordMatch) {
      throw new Error("Invalid username or password");
    }

    if (secretkey !== admin.adminDetails.secretkey) {
      throw new Error("Invalid secret key");
    }

    const token = jwt.sign(
      { userId: admin._id, username: admin.adminDetails.username },
      "your-secret-key",
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  }
};

const adminController = {
  register: async (req, res, next) => {
    try {
      const { username, password, email, key } = req.body;

      // Checking if any required field is missing
      if (!username || !password || !email || !key) {
        return res.status(400).json({ message: "Incomplete Credentials" });
      }
      if (key !== "ADMIN_420_69") {
        return res.status(400).json({ message: "Wrong key entered" });
      }
      // Checking if username or email already exists
      const existingUser = await Admin.findOne({
        $or: [
          { "adminDetails.username": username },
          { "adminDetails.email": email },
        ],
      });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "Username or email already exists" });
      }
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Creating a new admin
      const newAdmin = new Admin({
        adminDetails: {
          username,
          email,
          password: hashedPassword,
          secretkey: key,
        },
      });
      // Entering admin in the mongodb
      await newAdmin.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error registering user" });
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password, key } = req.body; // Accessing adminDetails object
      console.log(username, password, key);

      if (!username || !password || !key) {
        return res.status(400).json({ message: "Incomplete credentials" });
      }

      const token = await login(username, password, key);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: error.message });
    }
  },
  candidateReview: {
    get: async (req, res, next) => {
      try {
        const candidates = await Candidate.find();
        res.status(200).json({ candidates });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Error fetching candidate information" });
      }
    },
    put: async (req, res, next) => {
      try {
        const { candidateId, reviewStatus } = req.body;

        const candidate = await Candidate.findById(candidateId);

        if (!candidate) {
          return res.status(404).json({ message: "Candidate not found" });
        }

        candidate.reviewStatus = reviewStatus;
        await candidate.save();

        res
          .status(200)
          .json({ message: "Candidate review updated successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating candidate review" });
      }
    },
  },

  startElection: async (req, res, next) => {
    try {
      const stDate = req.body.startDate,
        edDate = req.body.endDate;
      if (!stDate || !edDate) {
        return res.status(404).json({ message: "Provide Dates" });
      }
      const flagCheck = true;
      const startElection = new election({
        startDate: stDate,
        endDate: edDate,
        flag: flagCheck,
      });
      await startElection.save();
      res
        .status(200)
        .json({
          message: "Election started successfully",
          data: startElection,
        });
    } catch (error) {
      console.error(error);
    }
  },

  viewResults: async (req, res, next) => {
    try {
      const voteResults = await voter.aggregate([
        {
          $group: {
            _id: { candidate: "$candidate", partyName: "$partyName" },
            totalVotes: { $sum: 1 },
          },
        },
      ]);
      res.json(voteResults);
    } catch (error) {
      console.error("Error fetching vote results:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
module.exports = adminController;
