import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch all users from JSON server
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;

      // Find the user with the provided email and password
      const user = users.find(user => user.email === formData.email && user.password === formData.password);

      if (user) {
        // Redirect based on user role
        if (user.email === 'admin@example.com' && user.password==='admin') {
          navigate('/admin-dashboard'); // Redirect to admin dashboard
        } else {
          navigate('/'); // Redirect to home page
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error("Error during login", error);
      setError('Login failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button type="submit">Login</button>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
