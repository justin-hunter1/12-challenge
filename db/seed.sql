-- Connect to the database
-- \c employees

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id, mgr)
VALUES
    ('John', 'Doe', 1, NULL, true),
    ('Mike', 'Chan', 2, 1, false),
    ('Ashley', 'Rodriguez', 3, NULL, true),
    ('Kevin', 'Tupik', 4, 3, false),
    ('Kunal', 'Singh', 5, NULL, true),
    ('Malia', 'Brown', 6, 5, false),
    ('Sarah', 'Lourd', 7, NULL, true),
    ('Tom', 'Allen', 8, 7, false);
