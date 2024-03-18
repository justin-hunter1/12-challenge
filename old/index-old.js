// Global Declaration 
const inquirer = require("inquirer");
let action = [
    {value: 0, name: "view all departments"},
    {value: 1, name: "view all roles"},
    {value: 2, name: "view all employees"},
    {value: 3, name: "add a department"},
    {value: 4, name: "add a role"},
    {value: 5, name: "add an employee"},
    {value: 6, name: "update an employee role"}
];

// declaration of questions
const questions = [
    {
        type: "list",
        message: "What would you like to do: ",
        choices: action,
        name: "q1"

    },
    {
        type: "input",
        message: "What text color would you like: ",
        name: "textcolor",
        default: "white"
    }
];

function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            console.log(answers);
            if (answers.text.length <= 3) {
                switch (answers.shape) {
                    case "Circle":
                        const circle = new Circle(answers.shapecolor, answers.textcolor, answers.text);
                        writeToFile(`./examples/${answers.shape}-logo.svg`, circle.render());
                        break;
                    case "Square":
                        const square = new Square(answers.shapecolor, answers.textcolor, answers.text);
                        writeToFile(`./examples/${answers.shape}-logo.svg`, square.render());
                        break;
                    case "Triangle":
                        const triangle = new Triangle(answers.shapecolor, answers.textcolor, answers.text);
                        writeToFile(`./examples/${answers.shape}-logo.svg`, triangle.render());
                        break;
                    default: 
                        return err = "We experienced an issue based on your answers"
                }
            }
            else {
                console.log("You entered more letters than requested, please only enter up to 3 letters.");
                init();
            }
        })
        .catch((err) => console.log(err));
}

init();
