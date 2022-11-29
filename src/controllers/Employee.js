import Model from '../database/Employee';

const Employee = {
  fetchAll: (req, res) => {
    Model.all('employees').then((employees) =>{
      res.status(200).send(employees);
    }).catch((error) => {
      res.status(400).send({message: error.message});
    })
  },

  createEmployee: (req, res) => {
    Model.insert('employees', req.body, 'employeeId').then((employee) => {
      console.log(employee)
      res.status(201).send(employee)
    }).catch((error) => {
      res.status(400).send({message: error.message});
    })
  }
}

export default Employee;