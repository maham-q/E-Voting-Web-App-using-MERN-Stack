import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './casting.css'
import { useNavigate } from 'react-router-dom';
function CastVotePage() {
  const [candidateName, setCandidateName] = useState('');
  const [username , setUsername] = useState('');
  
  const navigate=useNavigate();
  const handleVote = async () => {
    try {
      const response = await axios.post('/api/voter/castVote', {
        candidateName,username
      }); 
      alert('Vote Cast Successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Vote can not be cast!');
    }
  };
  return (
    <div>
      <h2>Cast Vote</h2>
      <div className='container'>
      <div className='canid'>
        Candidate Name: <input type="text" id='canid' value={candidateName} onChange={e => setCandidateName(e.target.value)} />
      </div>
      <div className='canid'>
        Username: <input type="text" id='canid' value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <button onClick={handleVote}>Cast Vote</button>
      </div>
    </div>
    </div>
  );
}
export default CastVotePage;
