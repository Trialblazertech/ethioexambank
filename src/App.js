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

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* Standalone Admin Functionalities */}
        <Route
          path="/admin/add-quiz"
          element={
            <AdminProtectedRoute>
              <AddQuiz />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-quiz"
          element={
            <AdminProtectedRoute>
              <ManageQuiz />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/free-plan-users"
          element={
            <AdminProtectedRoute>
              <FreePlanUsers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/premium-plan-users"
          element={
            <AdminProtectedRoute>
              <PremiumPlanUsers />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
