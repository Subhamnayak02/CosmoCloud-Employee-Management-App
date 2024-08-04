import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>CosmoCloud 
      <span className="text-gradient font-[800]"> Employee Management</span></h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add">Add Employee</Link>
      </div>
    </nav>
  );
};

export default Navbar;
