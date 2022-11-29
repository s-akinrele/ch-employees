import Model from '../database/Employee';

const Employee = {
  index: (req, res) => {
    Model.all('employees').then((employees) =>{
      res.status(200).send(employees);
    }).catch((error) => {
      res.status(400).send({message: error.message});
    })
  },

  create: (req, res) => {
    Model.insert('employees', req.body).then((employee) => {
      res.status(201).send(employee)
    }).catch((error) => {
      res.status(400).send({message: error.message});
    })
  },

  show: (req, res) => {
    Model.findOne('employees', req.params.id).then((response) => {
      res.status(200).send(response)
    }).catch((error) => {
      console.log(error)
      res.status(404).send({message: error.message});
    })
  }
}

export default Employee;