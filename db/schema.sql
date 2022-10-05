-- Create database --
DROP DATABASE IF EXISTS management;
CREATE DATABASE management;
USE management;

-- Drop tables if they exist --
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;


-- Create tables --
CREATE TABLE department (
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_departments
        FOREIGN KEY (department_id)
        REFERENCES department(department_id)
        ON DELETE CASCADE
);

CREATE TABLE employee (
    employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    CONSTRAINT fk_roles
        FOREIGN KEY (role_id)
        REFERENCES role(role_id)
        ON DELETE CASCADE,
    INDEX manag_ind (manager_id),
    CONSTRAINT fk_manager
        FOREIGN KEY (manager_id) 
        REFERENCES employee(employee_id) 
        ON DELETE SET NULL
);
