// DOM Elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-btn");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasksFromStorage);

// Add Task
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) { alert("⚠️ Please enter a task!"); return; }

  const taskObj = { text: taskText, completed: false };
  createTaskElement(taskObj);
  saveTaskToStorage(taskObj);
  taskInput.value = "";
}

// Create task element
function createTaskElement(taskObj) {
  const li = document.createElement("li");
  li.setAttribute("draggable", true);
  if (taskObj.completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = taskObj.text;
  span.classList.add("task-text");

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("buttons");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.onclick = () => editTask(span, li);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    li.remove();
    removeTaskFromStorage(span.textContent);
  };

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.classList.add("complete-btn");
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    updateTaskStatus(span.textContent, li.classList.contains("completed"));
  };

  btnContainer.append(completeBtn, editBtn, deleteBtn);
  li.append(span, btnContainer);
  taskList.appendChild(li);

  addDragAndDrop(li);
}

// Edit Task
function editTask(span, li) {
  const newText = prompt("Edit your task:", span.textContent);
  if (newText !== null && newText.trim() !== "") {
    updateTaskText(span.textContent, newText.trim());
    span.textContent = newText.trim();
  }
}

// --- LocalStorage Functions ---
function saveTaskToStorage(taskObj) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(taskObj => createTaskElement(taskObj));
}

function removeTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => {
    if (task.text === taskText) task.completed = completed;
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskText(oldText, newText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => {
    if (task.text === oldText) task.text = newText;
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --- Clear All Tasks ---
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
  }
});

// --- Drag and Drop ---
function addDragAndDrop(li) {
  li.addEventListener("dragstart", dragStart);
  li.addEventListener("dragover", dragOver);
  li.addEventListener("drop", drop);
  li.addEventListener("dragend", dragEnd);
}

let dragSrcEl = null;

function dragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
  this.style.opacity = '0.4';
}

function dragOver(e) {
  e.preventDefault();
  return false;
}

function drop(e) {
  e.stopPropagation();
  if (dragSrcEl !== this) {
    let temp = dragSrcEl.innerHTML;
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = temp;
    updateStorageAfterDrag();
    addDragAndDrop(dragSrcEl);
    addDragAndDrop(this);
  }
  return false;
}

function dragEnd() {
  this.style.opacity = '1';
}

// Update localStorage after drag & drop
function updateStorageAfterDrag() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
