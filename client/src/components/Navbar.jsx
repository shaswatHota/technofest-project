import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo">🎓 AlumniConnect</h1>
      </div>
      <div className="nav-right">
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/chat">Chat</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
