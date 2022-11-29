
const EmployeeController = require('../controllers/Employee');

const employeeRoute = (router) => {
  router.route('/api/v1/employees')
  .get(EmployeeController.fetchAll)
  .post(EmployeeController.createEmployee);
};

module.exports = employeeRoute;
