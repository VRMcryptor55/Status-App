import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import NavBar from './components/NavBar';

const App = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));

  // Logout handler to reset state and clear local storage
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setRole(null);
  };

  return (
    <Router>
      <NavBar role={role} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={setRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/customer" element={role === 'customer' ? <CustomerDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
