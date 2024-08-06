import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // TO DO: implement registration logic here
    console.log('Register submitted:', username, email, password, confirmPassword);
    // Assume registration is successful, redirect to Login page
    navigate('/login', { replace: true });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Create Your Account</h1>
        <p>Sign up to get started with personalized gifts and orders!</p>
        <form onSubmit={handleSubmit}>
        <div className="a">

          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
              </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
