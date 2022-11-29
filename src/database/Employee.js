import Database from "./index";

let defaultRecords = [{
  employeeId: "fb247afa-eb12-4040-944e-594ccbccc612",
  email: "bsmith@chtest.com",
  firstName: "Bob",
  lastName: "Smith",
  department: "Administration",
  salary: 80000,
  status: "active",
  createdAt: "2022-03-26T15:02:28.517Z"
}];

const databaseStore = new Database().createTable('employees', defaultRecords);

export default databaseStore;
