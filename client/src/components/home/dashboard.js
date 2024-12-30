import React from "react";
import "../css/dashboard.css"; // Import the separate CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button className="menu-button">☰</button>
        <span className="user-email">tel email</span>
        <button className="settings-button">⚙️</button>
      </header>
      <div className="dashboard-content">
        <h2 className="section-title">Take Quiz</h2>
        <div className="button-group">
          <button className="dashboard-button">Take Quiz</button>
          <button className="dashboard-button">View Results</button>
          <button className="dashboard-button">
            Customize Quiz <span className="emoji">🔥</span>
          </button>
          <button className="dashboard-button">
            Performance <span className="emoji">🔥</span>
          </button>
          <button className="dashboard-button">
            Leaderboard <span className="emoji">🔥</span>
          </button>
        </div>
      </div>
      <footer className="dashboard-footer">© ETHIO EXAM BANK</footer>
    </div>
  );
};

export default Dashboard;
