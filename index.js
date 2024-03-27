// Application Imports
const inquirer = require("inquirer");
const db = require ("./db/index.js");

// Global Declarations 


function init() {
    // declaration of Options available
    console.log("███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗    ████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗ ");
    console.log("██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝    ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗");
    console.log("█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗         ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝");
    console.log("██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝         ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗");
    console.log("███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗       ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║");
    console.log("╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝");
    
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
    db.fae()
    .then(
        ({rows}) => {
            let emp = rows;
            console.table(emp);
        }
    )
    .then(() => init())
    .catch((err) => console.log(err));
}

// list all current departments
function fad() {
    db.fad()
    .then(
        ({rows}) => {
            let dept = rows;
            console.table(dept);
        }
    )
    .then(() => init())
    .catch((err) => console.log(err));
}

// list all current roles
function far() {
    db.far()
    .then(
        ({rows}) => {
            let roles = rows;
            console.table(roles);
        }
    )
    .then(() => init())
    .catch((err) => console.log(err));
}

// create new employee
async function cEmp() {
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
            choices: rChoice = await getAvailRoles(),
            name: "emp_r"
        },
        {
            type: "list",
            message: "Who is the new employees' Manager: ",
            choices: mgrChoice = await getAvailMgr(),
            name: "mgr_id"
        }

    ]
    inquirer
        .prompt(questions)
        .then((answers) => {
            var newemp = {
                first_name: answers.emp_fn,
                last_name: answers.emp_ln,
                role_id: answers.emp_r,
                manager_id: answers.mgr_id,
             };
            db.cEmp(newemp);
        })
        .then(() =>
            console.log(`The new employee has been written to DB.`)
        )
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
            console.log(`The department has been written to DB.`);
        })
        .then(() => init())
    .catch((err) => console.log(err));

}

// create new role
async function cRole() {
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
            choices: aDept = await getAvailDept(),
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
            console.log(`The new role has been written to DB.`);
        })
        .then(() => init())
    .catch((err) => console.log(err));

}

// Update existing employee profile
async function uep() {    let questions = [
        {
            type: "list",
            message: "What employee do you want to update: ",
            choices: emp = await getEmp(),
            name: "emp"
        },
        {
            type: "list",
            message: "What is the employees' New Role: ",
            choices: role = await getAvailRoles(),
            name: "role_id"
        }
    ]
    inquirer
        .prompt(questions)
        .then((answers) => {
            let employeeId = answers.emp;
            let roleId = answers.role_id;
            db.cEmp(employeeId, roleId);
        })
        .then(() =>
            console.log(`The new employee role has been updated in DB.`)
        )
        .then(() => init())
    .catch((err) => console.log(err));

}

// exit application
function quit() {
    console.log("Logged Off");
    process.exit();
}

// lookup current roles to be used in employee creation
async function getAvailRoles() {
    try {
        let rows = await db.far()
        let roles = rows.rows;
            return roles.map(({id, title}) => ({
                name: title,
                value: id
            }));

        }   
    catch {
        ((err) => console.log(err));
    }
};

// lookup current managers to be used in employee creation
async function getAvailMgr() {
    try {
        let rows = await db.gam()
        let mgr = rows.rows;
            return mgr.map(({id, first_name, last_name}) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

        }   
    catch {
        ((err) => console.log(err));
    }    
};

// lookup current department to be used in role creation
async function getAvailDept() {
    try {
        const rows = await db.fad()
        let roles = rows.rows;
            return roles.map(({id, name}) => ({
                name: name,
                value: id
            }));

        }   
    catch {
        ((err) => console.log(err));
    }   
};

// lookup current department to be used in role creation
async function getEmp() {
    try {
        const rows = await db.fae()
        let emp = rows.rows;
            return emp.map(({id, first_name, last_name}) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

        }   
    catch {
        ((err) => console.log(err));
    }   
};

init();
