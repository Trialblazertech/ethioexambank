import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/home/login";
import Home from "./components/home/home";
import Register from "./components/home/register";
import ProtectedRoute from "./components/home/protectedRoute";
import { AuthProvider } from "./context/authContext";
import Dashboard from "./components/home/dashboard";
import ExamPage from "./components/home/examPage";

const App = () => {
  return (
    <AuthProvider>
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
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
