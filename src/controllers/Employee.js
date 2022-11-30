import Model from '../database/Employee';

const Employee = {
  index: (req, res) => {
    Model.all('employees').then((response) =>{
      res.status(200).send(response);
    }).catch((error) => {
      res.status(400).send({message: error.message});
    })
  },

  create: (req, res) => {
    const tableName = 'employees';
    Model.where(tableName, {search: {email: req.body.email}}).then(response => {
      if (response.length > 0) {
        return res.status(409).send({ message: `There is a user with this email: ${req.body.email}` });
      }

      Model.insert(tableName, req.body).then((response) => {
        res.status(201).send(response)
      }).catch((error) => {
        res.status(400).send({message: error.message});
      })
    })
  },

  show: (req, res) => {
    Model.findOne('employees', req.params.id).then((response) => {
      res.status(200).send(response)
    }).catch((error) => {
      res.status(404).send({message: error.message});
    })
  },

  search: (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      req.body = {sortBy: ['firstName', 'lastName']};
    }

    Model.where('employees', req.body).then((response) => {
      res.status(200).send(response)
    }).catch((error) => {
      res.status(404).send({message: error.message});
    })
  }
}

export default Employee;