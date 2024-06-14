import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const response = await axios.post('api/auth/login', {
            username,
            password,
          });
    
          const token = response.data.token;
          localStorage.setItem('token', token);
          console.log('Login successful. Token:', token);
          navigate('/dashboard');
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
                <button onClick={handleLogin}>Login</button>
                <div className='reg'>
                    <Link to="/register">New User?</Link>
                </div>
                <div className='reg'>
                    <Link to="/AdminLogin">Are you an Admin?</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
