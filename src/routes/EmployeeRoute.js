
const EmployeeController = require('../controllers/Employee');

const employeeRoute = (router) => {
  router.route('/employees')
  .get(EmployeeController.fetchAll)
  .post(EmployeeController.createEmployee);
};

module.exports = employeeRoute;
