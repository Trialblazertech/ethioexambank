// components/admin/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      // Store admin login state (can use localStorage or sessionStorage)
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin'); // Redirect to admin dashboard
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
