const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    flag: {
      type: Boolean, default: false
    }
});


const election = mongoose.model('election', electionSchema);
module.exports = election;
