
import EmployeeController from '../controllers/Employee';

const employeeRoute = (router) => {
  router.route('/api/v1/employees')
  .get(EmployeeController.fetchAll)
  .post(EmployeeController.createEmployee);
};

export default employeeRoute;
