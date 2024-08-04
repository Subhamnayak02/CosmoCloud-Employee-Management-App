import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeForm.css";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    country: "",
    zip: "",
  });
  const [contactMethods, setContactMethods] = useState([
    { contactMethod: "EMAIL", value: "" },
  ]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = { name, address, contactMethods };

    axios
      .post(
        "https://free-ap-south-1.cosmocloud.io/development/api/employee",
        newEmployee,
        {
          headers: {
            projectId: "66a9edab39e2fdc09bbb9f9f",
            environmentId: "66a9edab39e2fdc09bbb9fa0",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => navigate("/"))
      .catch((error) => console.error("Error adding employee:", error));
  };

  const handleContactChange = (index, e) => {
    const newContactMethods = [...contactMethods];
    newContactMethods[index][e.target.name] = e.target.value;
    setContactMethods(newContactMethods);
  };

  const addContactMethod = () => {
    setContactMethods([
      ...contactMethods,
      { contactMethod: "EMAIL", value: "" },
    ]);
  };

  return (
    <div className="container">
      <div className="form-box">
        <h1>Add Employee</h1>
        <form onSubmit={handleSubmit}>
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
              onChange={(e) =>
                setAddress({ ...address, line1: e.target.value })
              }
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
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
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
                    required
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={addContactMethod}
            className="anotherMethod"
          >
            Add Another Contact Method
          </button>
          <button type="submit">Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
