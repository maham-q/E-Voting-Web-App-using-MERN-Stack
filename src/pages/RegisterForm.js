import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername]= useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('api/auth/register', {
        username,
        password,
        email,
      }); 
      //console.log(response.data);
      console.log('User registered:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div className='container1'>
        <div className='user'>
          Username:<input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='email'>
          Email:<input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='pas'>
          Password:<input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div></div>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default RegisterForm;
