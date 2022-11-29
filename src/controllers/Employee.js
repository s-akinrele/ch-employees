import database from '../database/Employee';

const Employee = {
  fetchAll: (req, res) => {
    res.json(database)
  },

  createEmployee: (req, res) => {
    const employee = req.body;
    console.log(employee);
    database.push(employee);

    res.json(employee);
  }
}

export default Employee;