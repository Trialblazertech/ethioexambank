import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/home/login';
import Home from './components/home/home';
import Register from './components/home/register';
import ProtectedRoute from './components/home/protectedRoute';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

// Admin Functionalities
import AddQuiz from './components/admin/AddQuiz';
import ManageQuiz from './components/admin/ManageQuiz';
import FreePlanUsers from './components/admin/FreePlanUsers';
import PremiumPlanUsers from './components/admin/PremiumPlanUsers';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        >
          <Route path="add-quiz" element={<AddQuiz />} />
          <Route path="manage-quiz" element={<ManageQuiz />} />
          <Route path="free-plan-users" element={<FreePlanUsers />} />
          <Route path="premium-plan-users" element={<PremiumPlanUsers />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
