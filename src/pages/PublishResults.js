import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VoteResults() {
  const [voteResults, setVoteResults] = useState([]);

  useEffect(() => {
    fetchVoteResults();
  }, []);

  const fetchVoteResults = async () => {
    try {
      const response = await axios.get('/api/admin/viewResults');
      console.log(response);
      setVoteResults(response);
    } catch (error) {
      alert('No results!!!');
    }
  };

  return (
    <div>
      <h2>Vote Results</h2>
      <table>
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Party Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {voteResults.length > 0 &&
            voteResults.map((result, index) => (
              <tr key={index}>
                <td>{result.candidate}</td>
                <td>{result.partyName}</td>
                <td>{result.totalVotes}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default VoteResults;
