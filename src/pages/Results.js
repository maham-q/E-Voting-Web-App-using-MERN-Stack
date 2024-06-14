import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get('/api/admin/viewResults'); 
      const resultsData = response.data.results;
      setResults(resultsData);
    } catch (error) {
      console.error('Error fetching election results:', error);
    }
  };
  return (
    <div>
      <h2>Election Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            Candidate Name: {result.candidateName}, Vote Count: {result.voteCount}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Results;
