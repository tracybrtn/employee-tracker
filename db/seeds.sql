-- Department Seeds --
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Human Resources");

-- Employee Role Seeds --
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 130000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Accountant", 125000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Human Resources Manager", 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 75000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 60000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Recruiter", 75000, 3);


-- Employee Seeds --
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE("Pracy", "Turton-Travo", NULL, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE("Belle", "Goth", NULL, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE("Kendrick", "Duckworth", NULL, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE("Katie", "Simpson", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE("Stacey", "Henessy", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE("Lorelai", "Gilmore", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE("Vanessa", "Montez", 2, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE("Estela", "Benito", 2, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE("Daniela", "Gonzales", 2, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE("Elena", "Dunquerque", 3, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE("Yasmin", "Lopez", 3, 6);