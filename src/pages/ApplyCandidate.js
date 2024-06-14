import React, { useState } from 'react';
import './ApplyCandidate.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ApplyCandidate() {
  const [candidateName, setCandidateName] = useState('');
  const [partyName, setPartyName] = useState('');
  const [symbol, setSymbol] = useState('');
  const navigate = useNavigate();

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!candidateName || !partyName || !symbol) {
      console.log('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('/api/candidate/applyCandidate', {
        candidateName,
        partyName,
        symbol,
      });

      console.log('Application submitted:', response.data);
      alert('Candidate applied successfully!');
      navigate('/dashboard/candidateDashboard');
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div>
      <h2>Apply as a Candidate</h2>
      <div className='container'>
        <div className='name'>
          Name: <input type="text" id="Name" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} />
        </div>
        <div className='party'>
          Party Name: <input type="text" id="partyName" value={partyName} onChange={(e) => setPartyName(e.target.value)} />
        </div>
        <div className='symbol'>
          Symbol: <input type="text" id="symbol" onChange={(e) => setSymbol(e.target.value)} />
        </div>
        <div>
          <button onClick={handleApplication}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default ApplyCandidate;
