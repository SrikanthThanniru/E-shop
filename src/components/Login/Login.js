import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the CSS file

const Login = ({ setIsAuthenticated, setRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/users');
      const user = response.data.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        // Set authentication data in local storage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('role', user.role);
        setIsAuthenticated(true);
        setRole(user.role);
        navigate('/');
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('An error occurred while trying to log in.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
