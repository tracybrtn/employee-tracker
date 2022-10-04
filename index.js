const inquirer = require('inquirer');
//const db = require('./db');
const cTable = require('console.table');

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
            'Update an Employee',
            'Update an Employee Role',
            'Exit'
        ]
        }
    ])
    .then((answer) => {
        switch (answer.mainMenu) {
            case 'View All Departments':
                break;
            case 'View All Roles':
                break;
            case 'View All Employees':
                break;
            case 'Add a Department':
                break;
            case 'Add a Role':
                break;
            case 'Add an Employee':
                break;
            case 'Update an Employee':
                break;
            case 'Update an Employee Role':
                break;
            // Finish the application
            case 'Exit':
                console.log('Have a nice day.')
                process.exit();

        };
    });
};

mainMenu();