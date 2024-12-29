import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/admincss/AdminLogin.css'; // Import the CSS file for styling

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const adminCredentials = {
    email: 'admin@example.com',
    password: 'admin123',
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === adminCredentials.email && password === adminCredentials.password) {
      localStorage.setItem('isAdminLoggedIn', 'true'); // Store admin login state
      navigate('/admin'); // Redirect to admin dashboard
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            {/* <label>Email:</label> */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            {/* <label>Password:</label> */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
