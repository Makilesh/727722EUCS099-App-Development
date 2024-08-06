import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login', { email, password });
    navigate('/home'); // Redirect to home page after login
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login to Your Account</h1>
        <p>Access your personalized gifts and orders!</p>
        <form onSubmit={handleLogin}>
          <div className="a">

          <div className="input-group">
            <input
              class="input1" type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          </div>
              </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register now!</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
