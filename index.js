import readlineSync from "readline-sync";

const options = ["add", "list", "remove", "check"];

const bruteList = [
  { task: "codar", checked: false },
  { task: "comer", checked: false },
  { task: "dormir", checked: false },
];

let displayList = null;

start();

function start() {
  console.log("### TERMINAL TODO ###");
  renderDisplayList();

  const selectedOption = readlineSync.keyInSelect(
    options,
    "What do you want to do?"
  );
  console.clear();
  performSelectedOption(selectedOption);
}

function renderDisplayList() {
  const checked = "🟢 ";
  const unChecked = "🔴 ";

  displayList = bruteList.map((i) =>
    i.checked ? checked + i.task + "\n" : unChecked + i.task + "\n"
  );
}

function performSelectedOption(option) {
  const options = [addTask, listTasks, removeTask, checkOrUncheckTask];
  options[option]();
}

function listTasks() {
  console.log("### TERMINAL TODO ###");
  const horizontalLine = "==========================\n";

  console.log(horizontalLine);
  displayList.forEach((i) => console.log(i));
  console.log(horizontalLine);

  start();
}

function addTask() {}
function removeTask() {}
function checkOrUncheckTask() {}
