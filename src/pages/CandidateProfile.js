import React, { useState } from 'react';
import axios from 'axios';

function ViewProfile() {
  const [candidatePartyName, setCandidatePartyName] = useState('');
  const [candidateDetails, setCandidateDetails] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/candidate/profile?partyName=${candidatePartyName}`);
      const candidateProfile = response.data;
      setCandidateDetails(candidateProfile);
    } catch (error) {
      alert('No Such Party Exists!');
    }
  };
  return (
    <div>
      <style>
        {`
          h2 {
            text-align: center;
          }

          .container {
            margin: 0 auto;
            width: 80%;
            padding: 20px;
          }

          .canv {
            margin-bottom: 20px;
          }

          .vvot {
            border: 1px solid #ccc;
            padding: 10px;
            margin-top: 20px;
          }

          h3 {
            text-align: center;
          }
        `}
      </style>
      <h2>View Candidate Profile</h2>
      <div className='container'>
        <div className='canv'>
          Candidate Party Name: <input type="text" id='canv' value={candidatePartyName} onChange={e => setCandidatePartyName(e.target.value)} />
          <button onClick={fetchProfile}>Fetch Profile</button>
        </div>
        {candidateDetails && (
          <div className='vvot'>
            <h3>Party Details:</h3>
            <p>Name: {candidateDetails.candidateName}</p>
            <p>Party: {candidateDetails.partyName}</p>
            <p>Symbol: {candidateDetails.symbol}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewProfile;