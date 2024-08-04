import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EmployeeDetails.css";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`,
        {
          headers: {
            projectId: "66a9edab39e2fdc09bbb9f9f",
            environmentId: "66a9edab39e2fdc09bbb9fa0",
          },
        }
      )
      .then((response) => setEmployee(response.data))
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  }, [id]);

  const handleDelete = () => {
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
      .then(() => navigate("/"))
      .catch((error) => console.error("Error deleting employee:", error));
  };

  if (!employee) return <div className="spinner"></div>;

  return (
    <div className="employee-details-container">
      <div className="employee-details-box">
        <h1>Employee Details</h1>
        <p>
          <strong>Name:</strong> {employee.name}
        </p>
        <p>
          <strong>Address:</strong> {employee.address.line1},{" "}
          {employee.address.city}, {employee.address.country},{" "}
          {employee.address.zip}
        </p>
        <p>
          <strong>Contact Methods:</strong>
        </p>
        <ul>
          {employee.contactMethods.map((contact, index) => (
            <li key={index}>
              {contact.contactMethod}: {contact.value}
            </li>
          ))}
        </ul>
        <div className="button-container">
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
          <button
            className="update-button"
            onClick={() => navigate(`/update/${id}`)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
