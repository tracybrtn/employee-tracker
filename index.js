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
            case 'Exit':
                exitApp();
                break;
        };
    });
};


//VIEW ROLES
//WHEN I choose to view all departments
    //THEN I am presented with a formatted table showing department names and department ids
const viewDepartments = () => {
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
const viewEmployees = () => {
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
const viewRoles = () => {
    var sql = `SELECT role.title, role.role_id AS id, department.name AS department, role.salary FROM role JOIN department on role.department_id = department.department_id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.log('Showing all roles:');
        console.table(res);
        mainMenu();
    });
}
// END OF VIEW ROLES

//ADD DATA
//Add a new department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'Please, type name of new department',
            validate: addDepartment => {
                if(addDepartment) {
                    return true;
                } else {
                    console.log('Please, enter name of department')
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO department (name)
                VALUES (?)`;
        connection.query(sql, answer.addDepartment, (err, res) => {
            if (err) throw err;
            console.log('New department ' + answer.addDepartment + ' added.')
            viewDepartments();
        });
    });
};

//Add a new employee
const addEmployee = () => {

    connection.query(`Select * FROM role`, (err, role) => {
        if (err) throw err;
    
    connection.query(`Select * FROM employee WHERE manager_id IS NULL`, (err, managers) => {
        if (err) throw err;

        managers.map(manager => name: manager.first_name + " " + manager.last_name, value: manager.id)
        managers.push({name:'None', value: NULL});

        
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Please, enter first name of employee',
                validate: first_name => {
                    if(first_name) {
                        return true;
                    } else {
                        console.lof('Please, enter first name of new employee')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Please, enter last name of employee',
                validate: last_name => {
                    if(last_name) {
                        return true;
                    } else {
                        console.lof('Please, enter last name of new employee')
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Please, enter role of employee',
                choices: role.map(role => ({name:role.title, value: role.role_id})),
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Please, enter manager of employee',
                choices: manager,
            }

        ])
        .then(answer => {
            var sql = `INSERT INTO employee
                    VALUES (?)`;
        console.log('Add department chosen');
        exitApp();
        })
    })
    })
    }


//Add a new role
const addRole = () => {
    //Select department options for department list
    connection.query('Select * FROM department', (err, department) => {
        if (err) throw err; 

        //Inquirer prompts to add a new role
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'Please, insert name of new role',
                validate: roleName => {
                    if(roleName) {
                        return true;
                    } else {
                        console.log('Please, enter new role name')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Please, enter salary for the role',
                validate: roleSalary => {
                    if(!isNaN(roleSalary)) {
                        return true;
                    } else {
                        console.log('Please, enter salary for new role')
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'roleDepartment',
                message: 'Please, enter department for new role',
                choices: department.map(department => ({name:department.name, value: department.department_id}))
            },
        ])
    .then(answer => {
        const param = [answer.roleName, answer.roleSalary, answer.roleDepartment]
        const sql = `INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?)`;
        connection.query(sql, param, (err, res) => {
            if (err) throw err;
            console.log('New role ' + 'added.')
            viewRoles();
        });
    })
}
)}

const updateRole = () => {
    console.log('UpdateRole chosen');
    exitApp();
}

const exitApp = () => { 
    console.log('Have a nice day.');
    process.exit();
}

mainMenu();