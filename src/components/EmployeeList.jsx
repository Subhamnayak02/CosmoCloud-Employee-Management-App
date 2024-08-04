import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://free-ap-south-1.cosmocloud.io/development/api/employee", {
        headers: {
          projectId: "66a9edab39e2fdc09bbb9f9f",
          environmentId: "66a9edab39e2fdc09bbb9fa0",
        },
        params: {
          limit: 10,
          offset: 0,
        },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setEmployees(response.data.data);
        } else {
          setEmployees([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setError("Failed to fetch employees");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(
        `https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`,
        {
          headers: {
            projectId: "66a9edab39e2fdc09bbb9f9f",
            environmentId: "66a9edab39e2fdc09bbb9fa0",
          },
          data: {},
        }
      )
      .then(() => {
        setEmployees(employees.filter((emp) => emp._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        setError("Failed to delete employee");
      });
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="container">
      <div className="employee-box">
        <h2>Employee List</h2>
        {loading ? (
          <div className="spinner"></div>
        ) : error ? (
          <div>{error}</div>
        ) : employees.length === 0 ? (
          <p>No Employees in the system</p>
        ) : (
          <div className="employee-table">
            <div className="employee-header">
              <span className="header-item header-name">Name</span>
              <span className="header-item header-id">Employee ID</span>
              <span className="header-item">Actions</span>
            </div>
            {employees.map((emp) => (
              <div key={emp._id} className="employee-row">
                <span
                  onClick={() => navigate(`/details/${emp._id}`)}
                  className="employee-item employee-name"
                >
                  {emp.name}
                </span>
                <span className="employee-item employee-id">{emp._id}</span>
                <div className="employee-actions">
                  <button
                    onClick={() => handleUpdate(emp._id)}
                    className="update-button"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="add-button-container">
          <Link to="/add" className="add-button">
            Add Employee
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
