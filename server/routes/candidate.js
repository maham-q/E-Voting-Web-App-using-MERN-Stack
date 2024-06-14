const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

router.post('/applyCandidate', candidateController. applyCandidate);
router.get('/viewVoters', candidateController.viewVoters);
router.get('/totalVotes', candidateController.viewVotes);
router.get('/profile', candidateController.viewProfile);

module.exports = router;
