-- Department Seeds --
INSERT INTO department 
    (name)
VALUES 
    ("Engineering"),
    ("Finance"),
    ("Human Resources");


-- Employee Role Seeds --
INSERT INTO role 
    (title, salary, department_id)
VALUES 
    ("Lead Engineer", 130000, 1),
    ("Lead Accountant", 125000, 2),
    ("Human Resources Manager", 150000, 3),
    ("Software Engineer", 75000, 1),
    ("Accountant", 60000, 2),
    ("Recruiter", 75000, 3);

-- Employee Seeds --
INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Pracy", "Turton-Travo", 1, NULL),
    ("Belle", "Goth", 2, NULL),
    ("Kendrick", "Duckworth", 3, NULL),
    ("Katie", "Simpson", 4, 1),
    ("Stacey", "Henessy", 4, 1),
    ("Lorelai", "Gilmore", 4, 1),
    ("Vanessa", "Montez", 5, 2),
    ("Estela", "Benito", 5, 2),
    ("Daniela", "Gonzales", 5, 2),
    ("Elena", "Dunquerque", 6, 3),
    ("Yasmin", "Lopez", 6, 3);