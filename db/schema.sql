-- Drop the database if it exists
drop table if exists employee;
drop table if exists role;
drop table if exists department;
DROP DATABASE IF EXISTS employees;

-- Create the new database
CREATE DATABASE employees;

-- Connect to the database if using CLI to execute otherwise comment out
-- \c employees

-- Create the department table
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

-- Create the role table
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- Create the employee table
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);
