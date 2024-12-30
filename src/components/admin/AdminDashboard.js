import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTasks, FaUsers, FaUserTie } from 'react-icons/fa'; // Import icons
import '../assets/admincss/AdminDashboard.css';

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn'); // Clear admin login state
    window.location.href = '/admin/login'; // Redirect to admin login
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin/add-quiz">
                <FaPlus className="menu-icon" /> Add Quiz
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-quiz">
                <FaTasks className="menu-icon" /> Manage Quiz
              </Link>
            </li>
            <li>
              <Link to="/admin/free-plan-users">
                <FaUsers className="menu-icon" /> Free Plan Users
              </Link>
            </li>
            <li>
              <Link to="/admin/premium-plan-users">
                <FaUserTie className="menu-icon" /> Premium Plan Users
              </Link>
            </li>
          </ul>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>
      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome to the admin dashboard. Select an option from the sidebar.</p>
        </div>
        <div className="dashboard-navigation">
          <Link to="/admin/add-quiz" className="nav-box">
            <FaPlus className="nav-icon" />
            <h3>Add Quiz</h3>
            <p>Create new quizzes for your platform.</p>
          </Link>
          <Link to="/admin/manage-quiz" className="nav-box">
            <FaTasks className="nav-icon" />
            <h3>Manage Quiz</h3>
            <p>Edit or remove existing quizzes.</p>
          </Link>
          <Link to="/admin/free-plan-users" className="nav-box">
            <FaUsers className="nav-icon" />
            <h3>Free Plan Users</h3>
            <p>View and manage free plan users.</p>
          </Link>
          <Link to="/admin/premium-plan-users" className="nav-box">
            <FaUserTie className="nav-icon" />
            <h3>Premium Plan Users</h3>
            <p>Manage your premium users.</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
