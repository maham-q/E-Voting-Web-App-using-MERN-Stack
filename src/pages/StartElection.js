import React, { useState } from 'react';
import axios from 'axios';
import './startEle.css'
import { useNavigate } from 'react-router-dom';

function StartElection() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate=useNavigate();
  const handleStartElection = async () => {
    try {
      const response = await axios.post('/api/admin/startElection', {
        startDate,
        endDate,
      }); 
      console.log('Election started:', response.data);
      alert('Election Started!');
      navigate('/adminDashboard');
    } catch (error) {
      console.error('Error starting election:', error);
    }
  };
  return (
    <div>
      <h2>Start Election</h2>
      <div className='container'>
      <div className='start'>
        Start Date: <input type="date" id='start' value={startDate} onChange={e => setStartDate(e.target.value)} />
      </div>
      <div className='end'>
        End Date: <input type="date" id='end' value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>
      <div>
        <button onClick={handleStartElection}>Start Election</button>
      </div>
    </div>
    </div>
  );

}

export default StartElection;
