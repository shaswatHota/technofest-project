import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

//import '../styles/Navbar.css';

const Navbar = () => {
 

  const handleLogout = () => {
    const auth = getAuth();
  
    signOut(auth)
      .then(() => {
        // Clear local storage
        localStorage.removeItem("user");
        localStorage.removeItem("token"); // if you're storing token too
  
        // Optional: redirect
        window.location.href = "/login"; // or use React Router's useNavigate
  
        console.log("User signed out and local storage cleared");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };
  

  return (
    <nav className="flex justify-between pt-6 text-white">
      <div className="nav-left">
        <h1 className="logo">🎓 AlumniConnect</h1>
      </div>
      <div className="w-60 flex justify-between pr-8">
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/chat">Chat</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
