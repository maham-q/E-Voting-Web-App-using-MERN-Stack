import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [key , setKey] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const response = await axios.post('api/auth/adminLogin', {
            username,
            password,
            key
          });
    
          const token = response.data.token;
          localStorage.setItem('token', token);
          console.log('Login successful. Token:', token);
          alert("Admin Login Successful!");
          navigate('/adminDashboard');
        } catch (error) {
          console.error('Error during login:', error);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <div className='container'>
                <div className='user'>
                    Username:<input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='pas'>
                    Password:<input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='user'>
                    Secret Key:<input type="password" id='username' value={key} onChange={(e) => setKey(e.target.value)} />
                </div>
                <button onClick={handleLogin}>Login</button>
                <div className='reg'>
                    <Link to="/AdminRegister">New Admin?</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
