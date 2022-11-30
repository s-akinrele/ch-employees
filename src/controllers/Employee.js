import Model from '../database/Employee';
import {validateParams} from '../utils/databaseTools';

const TABLE_NAME = 'employees';

const Employee = {
  index: (req, res) => {
    Model.all(TABLE_NAME).then((response) =>{
      res.status(200).send(response);
    }).catch((error) => {
      res.status(400).send({message: error.message});
    })
  },

  create: (req, res) => {
    const validate = validateParams(req.body);
    if (validate.isValid) {
      Model.where(TABLE_NAME, {search: {email: req.body.email}}).then(response => {
        if (response.length > 0) {
          return res.status(409).send({ message: `There is a user with this email: ${req.body.email}` });
        }

        const permittedParams = (({ email, firstName, lastName, department, salary, status}) => ({ email, firstName, lastName, department, salary, status }))(req.body);
        Model.insert(TABLE_NAME, permittedParams).then((response) => {
          res.status(201).send(response)
        }).catch((error) => {
          res.status(400).send({message: error.message});
        })
      })
    } else {
      res.status(400).send({message: ` Params ${validate.missingParams.join(', ')} must be present`})
    }
  },

  show: (req, res) => {
    Model.findOne(TABLE_NAME, req.params.id).then((response) => {
      res.status(200).send(response)
    }).catch((error) => {
      res.status(404).send({message: error.message});
    })
  },

  search: (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      req.body = {sortBy: ['firstName', 'lastName']};
    }

    Model.where(TABLE_NAME, req.body).then((response) => {
      res.status(200).send(response)
    }).catch((error) => {
      res.status(404).send({message: error.message});
    })
  }
}

export default Employee;