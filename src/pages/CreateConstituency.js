import React, { useState } from 'react';
import axios from 'axios';
import './createCon.css'
import { useNavigate } from 'react-router-dom';
function CreateConstituency() {
  const [name, setName] = useState('');
  const [population, setPopulation] = useState('');
  const [district, setDistrict] = useState('');
  const navigate=useNavigate();
  const handleCreateConstituency = async () => {
    try {
      const response = await axios.post('/api/admin/createConstituency', {
        name,
        population,
        district,
      }); 
      
      console.log('Constituency created:', response.data);
      navigate('/dashboard/adminDashboard');
    } catch (error) {
      console.error('Error creating constituency:', error);
    }
  };

  return (
    <div>
      <h2>Create Constituency</h2>
      <div className='container'>
        <div className='name'>
      Name:<input type="text" id='name'  onChange={event => setName(event.target.value)}  />
      </div>
      <div className='pop'>
      Population:<input type="text" id='pop' onChange={event => setPopulation(event.target.value)}  />
      </div>
      <div className='dis'>
      District:<input type="text" id='dis' onChange={event => setDistrict(event.target.value)}  />
      </div>
      <button onClick={handleCreateConstituency}>Create</button>
      </div>
      </div>
  );
}

export default CreateConstituency;
