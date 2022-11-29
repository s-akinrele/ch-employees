// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const employees = [
  {
    employeeId: "fb247afa-eb12-4040-944e-594ccbccc612",
    email: "bsmith@chtest.com",
    firstName: "Bob",
    lastName: "Smith",
    department: "Administration",
    salary: 80000,
    status: "active",
    createdAt: "2022-03-26T15:02:28.517Z"
  }
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(employees);
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});
