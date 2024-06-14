const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.post('/startElection', adminController.startElection);
router.get('/candidateReview', adminController.candidateReview.get);
router.put('/candidateReview', adminController.candidateReview.put);
router.get('/viewResults', adminController.viewResults);

module.exports = router;
