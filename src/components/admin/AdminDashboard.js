import React from 'react';
import { Link } from 'react-router-dom';

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
          <li><Link to="/admin/add-quiz">Add Quiz</Link></li>
          <li><Link to="/admin/manage-quiz">Manage Quiz</Link></li>
          <li><Link to="/admin/free-plan-users">Free Plan Users</Link></li>
          <li><Link to="/admin/premium-plan-users">Premium Plan Users</Link></li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
