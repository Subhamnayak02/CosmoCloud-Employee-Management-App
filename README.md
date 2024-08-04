# Employee CRUD Application

This project is a simple CRUD Application built using React and CosmoCloud API It interacts with the CosmoCloud CRUD API to manage employee data.

## How to Run the Project Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository:**

    git clone  https://github.com/Subhamnayak02/CosmoCloud-Employee-Management-App.git
    cd employee-crud
   

2. **Install dependencies:**
    Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

    npm install
    Additionally, install the necessary packages:
    npm install axios react-router-dom react-icons


3. **Run the project:**
    npm start


4. **Open the app:**
    Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Functionality

This project is a simple CRUD application that uses the CosmoCloud API to manage employee records. It includes the following features:

1. **Employee Listing Page (default page):**
    - Displays a list of employees with their names and employee IDs.
    - Users can open the employee details page or delete an employee.
    - If no employees exist, a placeholder message is shown.

2. **Employee Details Page:**
    - Displays all the information of a specific employee.
    - Allows users to delete or update the employee.

3. **Add Employee Page:**
    - Users can add a new employee with the following details:
        - Name
        - Address (line1, city, country, zip code)
        - List of contact methods (email or phone)

## API Usage

The application interacts with the CosmoCloud API for CRUD operations:

- **Create Employee:**
    - Endpoint: `POST https://free-ap-south-1.cosmocloud.io/development/api/employee`
    - Headers:
        - `projectId: "66a9edab39e2fdc09bbb9f9f"`
        - `environmentId: "66a9edab39e2fdc09bbb9fa0"`
        - `Content-Type: "application/json"`

- **Read Employees:**
    - Endpoint: `GET https://free-ap-south-1.cosmocloud.io/development/api/employee`
    - Headers:
        - `projectId: "66a9edab39e2fdc09bbb9f9f"`
        - `environmentId: "66a9edab39e2fdc09bbb9fa0"`
    - Parameters: 
        - `limit: 10`
        - `offset: 0`

- **Read Employee Details:**
    - Endpoint: `GET https://free-ap-south-1.cosmocloud.io/development/api/employee/{id}`
    - Headers:
        - `projectId: "66a9edab39e2fdc09bbb9f9f"`
        - `environmentId: "66a9edab39e2fdc09bbb9fa0"`

- **Update Employee:**
    - This functionality is to be implemented as per your requirements.

- **Delete Employee:**
    - Endpoint: `DELETE https://free-ap-south-1.cosmocloud.io/development/api/employee/{id}`
    - Headers:
        - `projectId: "66a9edab39e2fdc09bbb9f9f"`
        - `environmentId: "66a9edab39e2fdc09bbb9fa0"`
    - Data: `{}`

