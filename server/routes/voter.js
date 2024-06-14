const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const candidateController = require('../controllers/candidateController');
const authController = require('../controllers/authController');

router.post('/castVote', authController.protect ,voteController.castVote);
router.get('/viewProfile', candidateController.viewProfile);

module.exports = router;
