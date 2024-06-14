import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './canReview.css';
import { useNavigate } from 'react-router-dom';

function CandidateReview() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState('');
  const [reviewStatus, setReviewStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('/api/candidate/getCandidates');
      const candidateData = response.data.candidates;
      setCandidates(candidateData);
      setLoading(false);
    } catch (error) {
      setError('Error fetching candidate information');
      setLoading(false);
    }
  };

  const handleUpdateReview = async () => {
    try {
      const response = await axios.put('/api/admin/candidateReview', {
        candidateId: selectedCandidateId,
        reviewStatus,
      });

      console.log('Candidate review updated:', response.data);
      navigate('/dashboard/adminDashboard');
    } catch (error) {
      console.error('Error updating candidate review:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Candidate Review</h2>
      <div>
          {candidates.map(candidate => (
            <li key={candidate && candidate._id}></li>
          ))}
      </div>
      <div className="container">
        <div className="canr">
          <select value={selectedCandidateId} onChange={e => setSelectedCandidateId(e.target.value)}>
            <option value="" disabled>Select Candidate</option>
            {candidates.map(candidate => (
              // Check if candidate exists before accessing its properties
              candidate && candidate._id && (
                <option key={candidate._id} value={candidate._id}>
                  {candidate.name}
                </option>
              )
            ))}
          </select>
        </div>
        <div className="stat">
          <select value={reviewStatus} onChange={e => setReviewStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <button onClick={handleUpdateReview}>Update Review</button>
        </div>
      </div>
    </div>
  );
}

export default CandidateReview;