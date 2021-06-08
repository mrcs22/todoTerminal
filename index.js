import readlineSync from "readline-sync";
import chalk from "chalk";
import fs from "fs";
import { exit } from "process";

const options = ["add", "list", "remove", "check"];

const terminalTodoHeader = chalk.bold(
  `${chalk.green("### TERMINAL")} ${chalk.magenta("T")}${chalk.red(
    "O"
  )}${chalk.yellow("D")}${chalk.blue("O")} ${chalk.green("###")}`
);

let bruteList = getTasksList();

let displayList = null;

start();

function start() {
  console.clear();
  console.log(terminalTodoHeader);

  displayList = getDisplayList();

  const selectedOption = readlineSync.keyInSelect(
    options,
    "What do you want to do?"
  );

  performSelectedOption(selectedOption, true);
}

function getTasksList() {
  return fs.existsSync("./tasks.json")
    ? JSON.parse(fs.readFileSync("./tasks.json")).tasks
    : [];
}

function getDisplayList() {
  const checked = "🟢 ";
  const unChecked = "🔴 ";

  return bruteList.map((i) =>
    i.checked ? checked + i.task + "\n" : unChecked + i.task + "\n"
  );
}

function performSelectedOption(option, isThisStart) {
  console.clear();
  console.log(terminalTodoHeader);

  if (option === -1) {
    if (!!isThisStart) {
      console.clear();
      process.exit(0);
    } else {
      start();
      return;
    }
  }

  const options = [addTask, listTasks, removeTask, checkOrUncheckTask];
  options[option]();
}

function listTasks() {
  console.log();
  const horizontalLine = "==========================\n";

  console.log(horizontalLine);
  displayList.forEach((i) => console.log(i));
  console.log(horizontalLine);

  const selectedOption = readlineSync.keyInSelect(
    options,
    "What do you want to do?"
  );

  performSelectedOption(selectedOption);
}

function addTask() {
  const newTask = readlineSync.question("What task do you want to add?");
  bruteList.push({
    task: newTask,
    checked: false,
  });
  fs.writeFileSync("./tasks.json", JSON.stringify({ tasks: bruteList }));
  console.log("Success!!");
  setTimeout(start, 1000);
}
function removeTask() {
  if (displayList.length === 0) {
    console.log("There's no tasks here");
    setTimeout(start, 1000);
    return;
  }

  const selectedTask = readlineSync.keyInSelect(
    displayList,
    "What todo do you want to remove?"
  );

  bruteList = bruteList.filter((t, i) => i !== selectedTask);
  fs.writeFileSync("./tasks.json", JSON.stringify({ tasks: bruteList }));

  console.log("Success!!");

  setTimeout(start, 1000);
}

function checkOrUncheckTask() {
  if (displayList.length === 0) {
    console.log("There's no tasks here");
    setTimeout(start, 1000);
    return;
  }

  const selectedTask = readlineSync.keyInSelect(
    displayList,
    "What todo do you want to check/uncheck?"
  );

  if (selectedTask === -1) {
    start();
    return;
  }
  bruteList[selectedTask].checked = !bruteList[selectedTask].checked;

  displayList = getDisplayList();
  console.clear();
  listTasks();

  fs.writeFileSync("./tasks.json", JSON.stringify({ tasks: bruteList }));

  setTimeout(start, 2000);
}
