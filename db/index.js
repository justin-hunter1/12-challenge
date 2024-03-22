const pool = require('./connection');

class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  };

// Find all employees
  fae() {
    return this.query("select employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id from employee inner join role on employee.role_id = role.id inner join department on role.department_id = department.id;");
  };

// Find all departments
  fad() {
    return this.query("select * from department;");
  };

// Find all roles
  far() {
    return this.query("select role.title, role.id, department.name, role.salary from role inner join department on role.department_id = department.id;");
  };

// Create a new employee
  cEmp(employee) {
    const { first_name, last_name, role_id, manager_id } = employee;
    return this.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
      [first_name, last_name, role_id, manager_id]);
  };

// Create a new department
  cDept(department) {
    return this.query("INSERT INTO department (name) VALUES ($1)",
      [department.name,]);
  };

// Create a new role
  cRole(role) {
    const { title, salary, department_id } = role;
    return this.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
      [title, salary, department_id]);
  };

// Update the given employee's role
  uep(employeeId, roleId) {
    return this.query("UPDATE employee SET role_id = $1 WHERE id = $2",
      [roleId, employeeId,]);
  };
}

module.exports = new DB();
