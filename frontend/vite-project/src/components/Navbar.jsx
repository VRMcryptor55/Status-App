import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ role, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();           // Reset state from parent
    navigate('/login');   // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex items-center justify-between shadow-md">
      <span className="text-2xl font-bold tracking-wide">Status App</span>
      <div className="flex items-center space-x-6 text-md">
        {role === 'admin' && <Link to="/admin" className="hover:underline">Admin Dashboard</Link>}
        {role === 'customer' && <Link to="/customer" className="hover:underline">Customer View</Link>}
        {role && (
          <button onClick={handleLogout} className="hover:underline hover:text-gray-200 transition">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
