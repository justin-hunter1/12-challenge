// Global Declaration 
const inquirer = require("inquirer");
const db = require ("./db/index.js");



function init() {
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

function fae() {
    console.log("find all emp");
}

function fad() {
    console.log("find all dept");
}

function far() {
    console.log("find all role");
}

function cEmp() {
    // let rChoice = getAvailRoles();
    // let mgrChoice = getAvailMgr();
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
            choices: ["1", "2", "3"],
            // choice: rChoice,
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
            console.log(answers);
            let newEmp = {
                manager_id: answers.mgr_id,
                role_id: answers.emp_r,
                first_name: answers.emp_fn,
                last_name: answers.emp_ln
            };
            db.cEmp(newEmp);
    })
    .catch((err) => console.log(err));
    
}

function cDept() {
    console.log("find create dept");
}

function cRole() {
    console.log("find create role");
}
function uep() {
    console.log("find update emp role");
}

function quit() {
    console.log("Logged Off");
    process.exit();
}

// function getAvailRoles() {
//     db.far().then(({rec}) => {
//         let roles = rec
//         let availRoles = roles.map(({id, title}) => ({
//             name: title,
//             value: id
//         })); return availRoles;
//     });
// };

// function getAvailMgr() {

// };

init();
