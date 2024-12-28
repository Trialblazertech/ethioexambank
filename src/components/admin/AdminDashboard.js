// components/admin/AdminDashboard.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn'); // Clear admin login state
    window.location.href = '/admin/login'; // Redirect to admin login
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="add-quiz">Add Quiz</Link></li>
          <li><Link to="manage-quiz">Manage Quiz</Link></li>
          <li><Link to="free-plan-users">Free Plan Users</Link></li>
          <li><Link to="premium-plan-users">Premium Plan Users</Link></li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
