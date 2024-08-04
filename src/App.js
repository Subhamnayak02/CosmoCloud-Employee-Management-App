import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployee from './components/AddEmployee';
import './App.css'; 
import UpdateEmployee from './components/UpdateEmployee';

const App = () => (
  <Router>
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/details/:id" element={<EmployeeDetails />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/update/:id" element={<UpdateEmployee />} /> 
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
