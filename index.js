const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection');

const init = () => {
    mainMenu();
}

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
            'View Employees by Manager',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Update an Employee Manager',
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
            case 'View Employees by Manager':
                viewEmployeesByManager();
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
            case 'Update an Employee Manager':
                updateManager();
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

//Bonus: View employees by manager
const viewEmployeesByManager = () => {
    connection.query(`SELECT * FROM employee WHERE manager_id IS NULL`, (err, manager) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'manager_id',
                message: 'Please, enter manager',
                choices:   manager = manager.map(manager => ({name: manager.first_name + " " + manager.last_name, value: manager.employee_id}))
            }
        ])
        .then(answer => {
            var sql = `SELECT * FROM employee WHERE manager_id = ?`
            connection.query(sql, answer.manager_id, (err, res) => {
                if (err) throw err;
                console.table(res);
                mainMenu();
            })
        })
        }
    )
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
    
    connection.query(`Select * FROM employee WHERE manager_id IS NULL`, (err, manager) => {
        if (err) throw err;

        manager = manager.map(manager => ({name: manager.first_name + " " + manager.last_name, value: manager.employee_id}));
        manager.push({name:'None'});

        
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
                        console.log('Please, enter last name of new employee')
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
            //If the answer for manager is none, the value should be null in the database
            if (answer.manager_id === 'None') {
                answer.manager_id = null;
            };
            const param = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;
            
            connection.query(sql, param, (err, res) => {
                if (err) throw err;
                console.log('New employee ' + answer.first_name + ' ' + answer.last_name + ' added.')
            viewEmployees();
            })
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
                        console.log('Please, enter salary (a number) for new role')
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
        })
    })
    })
}
//END OF ADD DATA

//UPDATE/CHANGE DATA
// Change an employee's role
const updateRole = () => {
    connection.query('Select * FROM employee', (err, employee) => {
        if (err) throw err; 
    connection.query('Select * FROM role', (err, role) => {
        if (err) throw err; 
    connection.query(`Select * FROM employee WHERE manager_id IS NULL`, (err, manager) => {
        if (err) throw err;
        manager = manager.map(manager => ({name: manager.first_name + " " + manager.last_name, value: manager.employee_id}));
        manager.push({name:'None'});

        inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Choose an employee to update their role',
                choices: employee.map( employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id}))
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Choose a new role for this employee',
                choices: role.map(role => ({name:role.title, value: role.role_id})),
            },
        ])

        .then(answer => {
            //If the answer for manager is none, the value should be null in the database
            if (answer.manager_id === 'None') {
                answer.manager_id = null;
            };

            const sql = `UPDATE employee
                        SET role_id = ?
                        WHERE employee_id = ?`;
            const param = [answer.role_id, answer.employee_id]

            connection.query(sql, param, (err, res) => {
                if (err) throw err;
                console.log('Role changed');
            viewEmployees();
        })
        })
    })
    })
    })
}

//Bonus: Change employee's manager
const updateManager = () => {
    connection.query('Select * FROM employee', (err, employee) => {
        if (err) throw err;
    connection.query(`Select * FROM employee WHERE manager_id IS NULL`, (err, manager) => {
        if (err) throw err;
        manager = manager.map( manager => ({name: manager.first_name + " " + manager.last_name, value: manager.employee_id}))
        manager.push({name:'None'});

        inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Choose an employee to update their manager',
                choices: employee.map( employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id}))
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Choose a new manager for this employee',
                choices: manager
            }
        ])
        .then(answer => {
            //If the answer for manager is none, the value should be null in the database
            if (answer.manager_id === 'None') {
                answer.manager_id = null;
            };
            const sql = `UPDATE employee
                        SET manager_id = ?
                        WHERE employee_id = ?`;
            const param = [answer.manager_id, answer.employee_id]

            connection.query(sql, param, (err, res) => {
                if (err) throw err;
                console.log('Manager changed');
            viewEmployees();
            })
        })
    })
    })
}

// Exit Application
const exitApp = () => { 
    console.log('Have a nice day.');
    process.exit();
}

init();