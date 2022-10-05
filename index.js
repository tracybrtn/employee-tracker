const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');
const connection = require('./db/connection');

const mainMenu = () => {
    console.log('Welcome to the Management Database.')
    return inquirer.prompt([
        {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Exit'
        ]
        }
    ])
    .then((answer) => {
        switch (answer.mainMenu) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateRole();
                break;
            // Finish the application
            case 'Exit':
                exitApp();
                break;
        };
    });
};


//WHEN I choose to view all departments
    //THEN I am presented with a formatted table showing department names and department ids
function viewDepartments() {
    var sql = `SELECT department.name AS department, department.department_id AS id FROM department`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.log('Showing all departments:');
        console.table(res);
        mainMenu();
    });
}

//WHEN I choose to view all employees
    //THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees() {
    var sql = `SELECT employee.employee_id AS id,
                        employee.first_name, 
                        employee.last_name, 
                        role.title AS job_title, 
                        department.name AS department, 
                        role.salary,
                        CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee 
                        LEFT JOIN role ON employee.role_id = role.role_id
                        LEFT JOIN department ON role.department_id = department.department_id
                        LEFT JOIN employee manager ON manager.employee_id = employee.manager_id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.log('Showing all employees:');
        console.table(res);
        mainMenu();
    });
}

//WHEN I choose to view all roles THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewRoles() {
    var sql = `SELECT role.title, role.role_id AS id, department.name AS department, role.salary FROM role JOIN department on role.department_id = department.department_id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.log('Showing all roles:');
        console.table(res);
        mainMenu();
    });
}

function addDepartment() {
    console.log('Add department chosen');
    exitApp();
}

function addEmployee() {
    console.log('Add employee chosen');
    exitApp();
}

function addRole() {
    console.log('Add role chosen');
    exitApp();
}

function updateRole() {
    console.log('UpdateRole chosen');
    exitApp();
}

function exitApp() { 
    console.log('Have a nice day.');
    process.exit();
}

mainMenu();