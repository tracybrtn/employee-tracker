# Employee Tracker

## Table of Contents
- [Employee Tracker](#employee-tracker)
  - [Description](#description)
    - [User Story](#user-story)
    - [Acceptance Criteria](#acceptance-criteria)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

# Description
A command-line content management system that manages a company's employee database using Node.js, Inquirer, and MySQL.


## User Story
AS A business owner
- I WANT to be able to view and manage the departments, roles, and employees in my company
  - SO THAT I can organize and plan my business

## Acceptance Criteria
GIVEN a command-line application that accepts user input
- WHEN I start the application
  - THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
  - THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
  - THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
  - THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
  - THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
  - THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
  - THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role
  - THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Installation

User should clone this repository from Github and download Node. From your terminal run commands `npm init`, `npm install inquirer`, and `npm install mysql2`. Here is a [video demonstrating how to install and use the app.]

## Usage

Use inquirer from your command-line to view, add, or update employee data. Run the following command at the root of the Employee Tracker folder to initializaze the application:  `node index.js`.

## Contributing

If you would like to contribute to this project reach out to me. You can find my contact information in the [Questions](#questions) section.

## Tests

No testing available at the moment.

## Questions

If you have any questions about this project, contact me at tracynburton@gmail.com.
Don't forget to check out my other projects! Visit [my github](https://github.com/tracybrtn).
