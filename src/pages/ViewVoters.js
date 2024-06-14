import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './viewVoters.css';

function ViewVoters() {
    const [voters, setVoters] = useState([]);
  
    useEffect(() => {
      fetchVoters();
    }, []);
  
    const fetchVoters = async () => {
      try {
        const response = await axios.get('/api/candidate/viewVoters'); 
        const votersData = response.data.voters;
        setVoters(votersData);
      } catch (error) {
        alert("There are no voters who have voted to any party!");
      }
    };
  
    return (
      <div>
        <h2>Voters List</h2>
        <div className="voters-container"> 
          <table className="voters-table"> 
            <thead>
              <tr>
                <th>Voter Name</th>
                <th>Party Voted</th>
              </tr>
            </thead>
            <tbody>
              {voters.map(voter => (
                <tr key={voter._id} className="voter-row">
                  <td>{voter.username}</td>
                  <td>{voter.candidate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default ViewVoters;
