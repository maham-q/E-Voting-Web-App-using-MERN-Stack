import React from 'react';
import axios from 'axios';
import { useState} from "react";
import './viewtotalVotes.css'

function ViewVotes() {
  const [candidatePartyName, setCandidatePartyName] = useState('');
  const [totalVotes, setTotalVotes] = useState(null);

  const FetchVotes = async () => {
    try {
      const response = await axios.get(`/api/candidate/totalVotes?partyName=${candidatePartyName}`);
      const candidateVotes = response.data.totalVotes;
      setTotalVotes(candidateVotes);
    } catch (error) {
      console.error('Error fetching candidate votes:', error);
    }
  };
  return (
    <div>
    <h2>View Candidate Votes</h2>
    <div className='container'>
    <div className='canv'>
      Candidate Party Name: <input type="text" id='canv' value={candidatePartyName} onChange={e => setCandidatePartyName(e.target.value)} />
      <button onClick={FetchVotes}>Fetch Votes</button>
    </div>
    {totalVotes !== null && (
      <div className='vvot'>
        <h3>Total Votes for Candidate {candidatePartyName}</h3>
        <p id='vot'>{totalVotes}</p>
      </div>
    )}
  </div>
  </div>
);

}

export default ViewVotes;
