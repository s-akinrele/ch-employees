
import EmployeeController from '../controllers/Employee';

const employeeRoute = (router) => {
  router.route('/api/v1/employees')
    .get(EmployeeController.index)
    .post(EmployeeController.create);

  router.route('/api/v1/employees/:id')
    .get(EmployeeController.show);

};

export default employeeRoute;
