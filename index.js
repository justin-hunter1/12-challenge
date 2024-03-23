// Application Imports
const inquirer = require("inquirer");
const db = require ("./db/index.js");

// Global Declarations 


async function init() {
    // declaration of Options available

    let options = [
        {value: "vDept", name: "view all departments"},
        {value: "vRole", name: "view all roles"},
        {value: "vEmp", name: "view all employees"},
        {value: "aDept", name: "add a department"},
        {value: "aRole", name: "add a role"},
        {value: "aEmp", name: "add an employee"},
        {value: "upEmpRole", name: "update an employee role"},
        {value: "exit", name: "Exit"}
    ];

    // declaration of questions
    let initialquestion = [
        {
            type: "list",
            message: "What would you like to do: ",
            choices: options,
            name: "initQ"
        }
    ];

    inquirer
        .prompt(initialquestion)
        .then((answers) => {
            switch (answers.initQ) {
                case "vEmp":
                    fae();
                    break;
                case "vDept":
                    fad();
                    break;
                case "vRole":
                    far();
                    break;
                case "aEmp":
                    cEmp();
                    break;
                case "aDept":
                    cDept();
                    break;
                case "aRole":
                    cRole();
                    break;
                case "upEmpRole":
                    uep();
                    break;
                default: 
                    quit();
            }
        })
        .catch((err) => console.log(err));
}

// list all current employees
function fae() {
    console.log("find all emp");
    console.table()
}

// list all current departments
function fad() {
    console.log("find all dept");
}

// list all current roles
function far() {
    console.log("find all role");
}

// create new employee
function cEmp() {
    rChoice = getAvailRoles();
    mgrChoice = getAvailMgr();
    let questions = [
        {
            type: "input",
            message: "What is the new employees' first name: ",
            name: "emp_fn"
        },
        {
            type: "input",
            message: "What is the new employees' last name: ",
            name: "emp_ln"
        },
        {
            type: "list",
            message: "What is the new employees' role: ",
            // choices: ["1", "2", "3"],
            choices: rChoice,
            name: "emp_r"
        },
        {
            type: "list",
            message: "Who is the new employees' Manager: ",
            choices: ["1", "2", "3",],
            // choice: mgrChoice,
            name: "mgr_id"
        }

    ]
    inquirer
        .prompt(questions)
        .then((answers) => {
            let newemp = {
                manager_id: answers.mgr_id,
                role_id: answers.emp_r,
                first_name: answers.emp_fn,
                last_name: answers.emp_ln
            };
            db.cEmp(newemp);
        })
        .then(() => { 
            console.log(`The new employee ${newemp.first_name} ${newemp.last_name} has been written to DB.`);
        })
        .then(() => init())
    .catch((err) => console.log(err));
    
}

// create new department
function cDept() {
    let questions = [
        {
            type: "input",
            message: "What is the new department name: ",
            name: "dept_name"
        }
    ]
    inquirer
        .prompt(questions)
        .then((answers) => {
            let newdept = {
                name: answers.dept_name
            };
            db.cDept(newdept);
        })
        .then(() => { 
            console.log(`The department ${newEmp.name} has been written to DB.`);
        })
        .then(() => init())
    .catch((err) => console.log(err));

}

// create new role
function cRole() {
    // let aDept = getAvailDept();
    let questions = [
        {
            type: "input",
            message: "What is the new role name: ",
            name: "role_name"
        },
        {
            type: "input",
            message: "What is the salary of this role: ",
            name: "role_salary"
        },
        {
            type: "list",
            message: "Which department is this role for: ",
            choices: ["1", "2", "3"],
            // choice: aDept,
            name: "role_dept_id"
        }
    ]
    inquirer
        .prompt(questions)
        .then((answers) => {
            let newrole = {
                title: answers.role_name,
                salary: answers.role_salary,
                department_id: answers.role_dept_id
            };
            db.cRole(newrole);
        })
        .then(() => { 
            console.log(`The new role ${newEmp.title} has been written to DB.`);
        })
        .then(() => init())
    .catch((err) => console.log(err));

}

// Update existing employee profile
function uep() {
    console.log("find update emp role");
}

// exit application
function quit() {
    console.log("Logged Off");
    process.exit();
}

// lookup current roles to be used in employee creation
function getAvailRoles() {
    db.far()
    .then(
        ({rows}) => {
            let roles = rows;
            let availRoles = roles.map(({id, title}) => ({
                name: title,
                value: id
            }));
            return availRoles;
        }   
    )
    .catch((err) => console.log(err));
    return;
};

// lookup current managers to be used in employee creation
function getAvailMgr() {
    
};

// lookup current department to be used in role creation
function getAvailDept() {
    
};


init();
