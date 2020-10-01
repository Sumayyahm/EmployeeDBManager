-- Drops the employeetracker_db if it exists currently --
DROP DATABASE IF EXISTS employeetracker_db;
-- Creates the "employeetracker_db" database --
CREATE DATABASE employeetracker_db;

-- Makes it so all of the following code will affect employeetracker_db --
USE employeetracker_db;
-- Creates the table "emloyee" within employeetracker_db --
CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT, 
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
roleId INTEGER NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
manager VARCHAR(50),
department_id INTEGER(10),
PRIMARY KEY (roleId)
);

CREATE TABLE department (
  deptId INTEGER NOT NULL,
  departmentName VARCHAR(30)
);

INSERT INTO employee (firstName, lastName) 
VALUES ('Matt', 'Jacob');

INSERT INTO employee (firstName, lastName) 
VALUES ('Isabella', 'Smith');

INSERT INTO employee (firstName, lastName) 
VALUES ('Emma', 'Jayden');

INSERT INTO employee (firstName, lastName) 
VALUES ('Gaurav', 'Mehta');

INSERT INTO employee (firstName, lastName) 
VALUES ('Maria', 'Guiteraz');

INSERT INTO employee (firstName, lastName) 
VALUES ('Samuel', 'Alfonzo');

INSERT INTO employee (firstName, lastName) 
VALUES ('Sarfaraz', 'Ahamed');

INSERT INTO employee (firstName, lastName) 
VALUES ('Virat', 'Kohli');

INSERT INTO employee (firstName, lastName) 
VALUES ('Andrew', 'Flintoff');

INSERT INTO employee (firstName, lastName) 
VALUES ('Mason', 'Gerard');

INSERT INTO employee (firstName, lastName) 
VALUES ('Sonya', 'Davis');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', '100000', '1');

INSERT INTO roles (title, salary, manager, department_id)
VALUES ('Sales Person', '80000', 'Matt Jacob', '1');

INSERT INTO roles (title, salary, manager,  department_id)
VALUES ('Software Engineer', '120000', 'Gaurav Mehta', '2');

INSERT INTO roles (title, salary, department_id)
VALUES ('Lead Engineer', '150000', '2');

INSERT INTO roles (title, salary, manager, department_id)
VALUES ('Software Engineer', '120000', 'Gaurav Mehta', '2');

INSERT INTO roles (title, salary, manager, department_id)
VALUES ('Full Stack Developer', '85000', 'Virat Kohli', '3');

INSERT INTO roles (title, salary, manager, department_id)
VALUES ('Front end Developer', '70000', 'Virat Kohli', '3');

INSERT INTO roles (title, salary, department_id)
VALUES ('Project Manager', '95000', '3');

INSERT INTO roles (title, salary, department_id)
VALUES ('Accountant', '125000', '4');

INSERT INTO roles (title, salary, department_id)
VALUES ('Legal Team Lead', '250000', '5');

INSERT INTO roles (title, salary, manager,  department_id)
VALUES ('Lawyer', '190000',  'Mason Gerard', '5');

INSERT INTO department (deptId, departmentName)
VALUES ('1', 'Sales');

INSERT INTO department (deptId, departmentName)
VALUES ('2', 'Engineering');

INSERT INTO department (deptId, departmentName)
VALUES ('3', 'Web Development');

INSERT INTO department (deptId, departmentName)
VALUES ('4', 'Finance');

INSERT INTO department (deptId, departmentName)
VALUES ('5', 'Legal');



