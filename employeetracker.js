var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Youaremybootcamp1!",
  database: "employeetracker_db"});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
    console.log("EMPLOYEE MANAGER")
    inquirer
    .prompt({
      name: "menulist",
      type: "list",
      message: "Would you like to do?",
      choices: [
        "View all employees",
        "View all employees by role",
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "Remove department",
        "View total utilized budget of a department"
      ]
    }).then(function(answer) {
        console.log("\n");
        switch(answer.menulist) {
            case "View all employees" :
                    viewEmployees();
                break;

            case "View all employees by role" :
                viewEmployeeByRole();
                break;

            case "View all employees by department" :
                viewEmployeesByDept();
                break;

            case "View all employees by manager" :
                viewEmployeesByManager();
                break;

            case "Add employee" :
                addEmployee();
                break;

            case "Remove employee" :
                removeEmployee();
                break;

            case "Update employee role" :
                updateRole();
                break;

            case "Update employee manager" :
                updateManager();
                break;

            case "Remove department" :
                removeDepartment();
                break;

            case "View total utilized budget of a department" :
                departmentBudget();
                break;
        }
    });
}


function viewEmployees() {
    connection.query("SELECT id, firstName, lastName, title, departmentName, salary, manager FROM roles INNER JOIN employee ON roles.roleId = employee.id INNER JOIN department ON roles.department_id = department.deptId;", function(err, data) {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        console.log("\n");
        start();
    });
}

function viewEmployeeByRole() {
    connection.query("SELECT title, concat(firstName, ' ', lastName) AS EmployeeName FROM roles INNER JOIN employee ON roles.roleId = employee.id;", function(err, data) {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        console.log("\n");
        start();
    });
}

function viewEmployeesByDept() {
    connection.query("SELECT departmentName, concat(firstName, ' ', lastName) AS EmployeeName FROM roles INNER JOIN employee ON roles.roleId = employee.id LEFT JOIN department ON roles.department_id = department.deptId;", function(err, data) {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        console.log("\n");
        start();
    });
}

function viewEmployeesByManager() {
    connection.query("SELECT concat(firstName, ' ', lastName) AS EmployeeName , manager FROM roles INNER JOIN employee ON roles.roleId = employee.id AND roles.manager IS NOT NULL;", function(err, data) {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        console.log("\n");
        start();
    });
}

function addEmployee() {
    connection.query("SELECT id, concat(firstName, ' ', lastName) AS Name, title, departmentName, salary, manager FROM roles INNER JOIN employee ON roles.roleId = employee.id INNER JOIN department ON roles.department_id = department.deptId;", function(err, data) {
        if (err) throw err;
    inquirer
    .prompt([
    {
        name : "empFirstName",
        type : "input",
        message : "What is the employee's first name?"
    },
    {
        name : "empLastName",
        type : "input",
        message : "What is the employee's last name?"
    },
    {
        name : "empRole",
        type : "list",
        message : "What is the employee's role?",
        choices : ["Sales Lead", "Sales Person", "Lead Engineer", "Software Engineer", "Full Stack Developer", "Front End Developer", "Accountant", "Legal Team Lead", "Lawyer"]
        
    },
    {
        name : "empManager",
        type : "list",
        message : "Who is the employee's manager?",
        choices : function(){
            var empManagerArray = [];
            for (var i = 0; i < data.length; i++) {
                empManagerArray.push(data[i].Name);
            }
            return empManagerArray;
        }
    }
]).then(function(answer) {
    connection.query("INSERT INTO employee SET ?",
    {
        firstName: answer.empFirstName,
        lastName: answer.empLastName
    },
     function(err,) {
        if (err) throw err;
        switch(answer.empRole) {
            case "Sales Lead" :
                connection.query("INSERT INTO roles SET ?",
                {
                    title : answer.empRole,
                    salary : "100000",
                    manager : answer.empManager,
                    department_id : "1"
                }, function(err) {
                    if (err) throw err;
                });
                break;
    
            case "Sales Person" :
                connection.query("INSERT INTO roles SET ?",
                    {
                        title : answer.empRole,
                        salary : "80000",
                        manager : answer.empManager,
                        department_id : "1"
                    }, function(err) {
                        if (err) throw err;
                    });
                    break;
    
            case "Lead Engineer" :
                connection.query("INSERT INTO roles SET ?",
                    {
                        title : answer.empRole,
                        salary : "150000",
                        manager : answer.empManager,
                        department_id : "2"
                    }, function(err) {
                            if (err) throw err;
                        });
                        break;
    
            case "Software Engineer" :
                connection.query("INSERT INTO roles SET ?",
                    {
                        title : answer.empRole,
                        salary : "120000",
                        manager : answer.empManager,
                        department_id : "2"
                    }, function(err) {
                            if (err) throw err;
                                });
                                break;
    
            case "Accountant" :
                connection.query("INSERT INTO roles SET ?",
                                        {
                                            title : answer.empRole,
                                            salary : "125000",
                                            manager : answer.empManager,
                                            department_id : "4"
                                        }, function(err) {
                                                if (err) throw err;
                                            });
                                            break;
    
            case "Legal Team Lead" :
                connection.query("INSERT INTO roles SET ?",
                                {
                                    title : answer.empRole,
                                    salary : "250000",
                                    manager : answer.empManager,
                                    department_id : "5"
                                }, function(err) {
                                if (err) throw err;
                                    });
                                    break;
        
            case "Lawyer" :
                connection.query("INSERT INTO roles SET ?",
                    {
                        title : answer.empRole,
                        salary : "190000",
                        manager : answer.empManager,
                        department_id : "5"
                    }, function(err) {
                        if (err) throw err;
                                });
                        break;

            case "Full Stack Developer":
                connection.query("INSERT INTO roles SET ?",
                {
                    title : answer.empRole,
                    salary : "85000",
                    manager : answer.empManager,
                    department_id : "3"
                }, function(err) {
                    if (err) throw err;
                        });
                        break;

            case "Front End Developer":
                connection.query("INSERT INTO roles SET ?",
                {
                    title : answer.empRole,
                    salary : "70000",
                    manager : answer.empManager,
                    department_id : "3"
                }, function(err) {
                    if (err) throw err;
                });
                break;
        }
        console.log("Employee " + answer.empFirstName + " " + answer.empLastName + " " + "added to Database!\n");
        start();
     });
});
});
}

function removeEmployee(){
    connection.query("SELECT id, concat(firstName, ' ', lastName) AS Name, title, departmentName, salary, manager FROM roles LEFT JOIN employee ON roles.roleId = employee.id LEFT JOIN department ON roles.department_id = department.deptId;", function(err, data) {
        if (err) throw err;
    inquirer
    .prompt([
    {
        name : "empFirstName",
        type : "input",
        message : "What is the employee's first name?"
    },
    {
        name : "empLastName",
        type : "input",
        message : "What is the employee's last name?"
    }]).then(function(answer) {
        connection.query("DELETE roles FROM roles LEFT JOIN employee ON roles.roleId = employee.id LEFT JOIN department ON roles.department_id = department.deptId WHERE firstName = ? AND lastNAme = ?;", [answer.empFirstName, answer.empLastName], function(err) {
            if (err) throw err;
            console.log("Employee " + answer.empFirstName + " " + answer.empLastName + " " + "deleted from Database!\n");
            start();
        });
    });
});
}

function updateRole () {
    connection.query("SELECT id, concat(firstName, ' ', lastName) AS Name, title, departmentName, salary, manager FROM roles LEFT JOIN employee ON roles.roleId = employee.id LEFT JOIN department ON roles.department_id = department.deptId;", function(err, data) {
        if (err) throw err;
    inquirer.prompt([
    {
        name : "empFirstName",
        type : "input",
        message : "What is the first name of the employee whose role needs to be updated?"
    },
    {
        name : "empLastName",
        type : "input",
        message : "What is the last name of the employee whose role needs to be updated?"
    },
    {
        name : "empRole",
        type : "list",
        message : "Which role would you like to assign to this employee?",
        choices : ["Sales Lead", "Sales Person", "Lead Engineer", "Software Engineer", "Full Stack Developer", "Front End Developer", "Accountant", "Legal Team Lead", "Lawyer"]
    }
]).then(function(answer) {
     connection.query("SELECT id FROM employee WHERE firstName = ? AND lastName = ?", [answer.empFirstName, answer.empLastName], function (err, row) {
        if (err) throw err;
        var idValue = row[0].id;
        connection.query("UPDATE roles SET title = ? WHERE roleId = ?", [answer.empRole, idValue], function(err) {
            if (err) throw err;
             console.log("Employee " + answer.empFirstName + " " + answer.empLastName + "'s role has been updated to " + answer.empRole + "\n");
             start();
          });
    }); 
});
});
}

function removeDepartment(){
    connection.query("SELECT id, concat(firstName, ' ', lastName) AS Name, title, departmentName, salary, manager FROM roles LEFT JOIN employee ON roles.roleId = employee.id LEFT JOIN department ON roles.department_id = department.deptId;", function(err, data) {
        if (err) throw err;
    inquirer
    .prompt([
    {
        name : "department",
        type : "list",
        message : "Which department do you want to delete from the database?",
        choices : ["Sales", "Engineering", "Web Development", "Finance", "Legal"]
    }
]).then(function(answer) {
        connection.query("DELETE roles FROM roles LEFT JOIN employee ON roles.roleId = employee.id LEFT JOIN department ON roles.department_id = department.deptId WHERE departmentName = ?;", answer.department , function(err) {
            if (err) throw err;
            console.log(answer.department + " department has been deleted from Database!\n");
            start();
        });
    });
});
}

function updateManager() {
    connection.query("SELECT id, concat(firstName, ' ', lastName) AS Name, title, departmentName, salary, manager FROM roles LEFT JOIN employee ON roles.roleId = employee.id LEFT JOIN department ON roles.department_id = department.deptId;", function(err, data) {
        if (err) throw err;
    inquirer.prompt([
    {
        name : "empFirstName",
        type : "input",
        message : "What is the first name of the employee whose manager needs to be updated?"
    },
    {
        name : "empLastName",
        type : "input",
        message : "What is the last name of the employee whose manager needs to be updated?"
    },
    {
        name : "empManager",
        type : "list",
        message : "Who is the employee's new manager?",
        choices : function(){
            var empManagerArray = [];
            for (var i = 0; i < data.length; i++) {
                empManagerArray.push(data[i].Name);
            }
            return empManagerArray;
        }
    }]).then(function(answer) {
        connection.query("SELECT id FROM employee WHERE firstName = ? AND lastName = ?", [answer.empFirstName, answer.empLastName], function (err, row) {
            if (err) throw err;
            var idValue = row[0].id;
            connection.query("UPDATE roles SET manager = ? WHERE roleId = ?", [answer.empManager, idValue], function(err) {
                if (err) throw err
                console.log("Manager for Employee " + answer.empFirstName + " " + answer.empLastName + " is now " + answer.empManager +"\n");
                start();
            });
    });
});
});
}

function departmentBudget() {
    connection.query("SELECT id, concat(firstName, ' ', lastName) AS Name, title, departmentName, salary, manager FROM roles LEFT JOIN employee ON roles.roleId = employee.id LEFT JOIN department ON roles.department_id = department.deptId;", function(err, data) {
        if (err) throw err;
    inquirer
    .prompt([
    {
        name : "department",
        type : "list",
        message : "Which department's total utilized budget would you like to calculate?",
        choices: ["Sales", "Engineering", "Web Development", "Finance", "Legal"]
    }]).then(function(answer) {
        connection.query("SELECT SUM(salary) FROM roles INNER JOIN employee ON roles.roleId = employee.id INNER JOIN department ON roles.department_id = department.deptId WHERE departmentName = ?;", answer.department , function(err, data) {
            if (err) throw err;
            console.log("The total utilized budget of the " + answer.department + " department is as follows \n");
            console.table(data);
            console.log("\n");
            start();
        });
    });
});
}