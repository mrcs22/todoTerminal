import readlineSync from "readline-sync";

const options = ["add", "list", "remove", "check"];

let bruteList = [
  { task: "codar", checked: false },
  { task: "comer", checked: false },
  { task: "dormir", checked: false },
];

let displayList = null;

start();

function start() {
  console.clear();
  console.log("### TERMINAL TODO ###");
  renderDisplayList();

  const selectedOption = readlineSync.keyInSelect(
    options,
    "What do you want to do?"
  );

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
  console.clear();
  const options = [addTask, listTasks, removeTask, checkOrUncheckTask];
  options[option]();
}

function listTasks() {
  console.log("### TERMINAL TODO ###");
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

  console.log("Success!");
  setTimeout(start, 2000);
}
function removeTask() {
  const selectedTask = readlineSync.keyInSelect(
    displayList,
    "What todo do you want to remove?"
  );

  bruteList = bruteList.filter((t, i) => i !== selectedTask);
  console.log("Success!");
  setTimeout(start, 2000);
}
function checkOrUncheckTask() {}
