import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/UpdateEmployee.css';

const UpdateEmployee = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [address, setAddress] = useState({ line1: '', city: '', country: '', zip: '' });
  const [contactMethods, setContactMethods] = useState([{ contactMethod: 'EMAIL', value: '' }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`, {
      headers: {
        'projectId': '66a9edab39e2fdc09bbb9f9f',
        'environmentId': '66a9edab39e2fdc09bbb9fa0'
      }
    })
      .then(response => {
        const employeeData = response.data;
        if (employeeData) {
          setName(employeeData.name || '');
          setAddress(employeeData.address || { line1: '', city: '', country: '', zip: '' });
          setContactMethods(employeeData.contactMethods.length ? employeeData.contactMethods : [{ contactMethod: 'EMAIL', value: '' }]);
        } else {
          setError('Employee data not found');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
        setError('Error fetching employee data');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployee = { name, address, contactMethods };

    axios.put(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`, updatedEmployee, {
      headers: {
        'projectId': '66a9edab39e2fdc09bbb9f9f',
        'environmentId': '66a9edab39e2fdc09bbb9fa0',
        'Content-Type': 'application/json'
      }
    })
      .then(() => navigate('/'))
      .catch(error => console.error('Error updating employee:', error));
  };

  const handleContactChange = (index, e) => {
    const newContactMethods = [...contactMethods];
    newContactMethods[index][e.target.name] = e.target.value;
    setContactMethods(newContactMethods);
  };

  const addContactMethod = () => {
    setContactMethods([...contactMethods, { contactMethod: 'EMAIL', value: '' }]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="update-employee-container">
      <h1>Update Employee</h1>
      <form onSubmit={handleSubmit} className="update-employee-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address Line 1:</label>
          <input
            type="text"
            value={address.line1}
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            value={address.country}
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>ZIP Code:</label>
          <input
            type="text"
            value={address.zip}
            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Methods:</label>
          <div className="contact-methods-container">
            {contactMethods.map((contact, index) => (
              <div key={index} className="contact-method">
                <select
                  name="contactMethod"
                  value={contact.contactMethod}
                  onChange={(e) => handleContactChange(index, e)}
                >
                  <option value="EMAIL">Email</option>
                  <option value="PHONE">Phone</option>
                </select>
                <input
                  type="text"
                  name="value"
                  value={contact.value}
                  onChange={(e) => handleContactChange(index, e)}
                  placeholder="Contact value"
                  required
                />
              </div>
            ))}
          </div>
        </div>
        <button type="button" className="add-contact-button" onClick={addContactMethod}>
          Add Contact Method
        </button>
        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
