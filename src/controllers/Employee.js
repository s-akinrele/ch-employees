import EmployeeModel from '../database/Employee';

const Employee = {
  fetchAll: (req, res) => {
    EmployeeModel.all('employees').then((employees) =>{
      res.json(employees)
    }).catch((error) => {
      res.status(400).send({message: error.message});
    })
  },

  createEmployee: (req, res) => {
    const employee = req.body;
    console.log(employee);
    database.push(employee);

    res.json(employee);
  }
}

export default Employee;