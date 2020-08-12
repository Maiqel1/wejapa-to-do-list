// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskCompleted = document.querySelector('.collection-x');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const timeInput = document.querySelector('#time');
const addTaskItem = document.querySelector('.add-task-action')


// Load all event listeners
loadEventListeners();

// List of all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  document.addEventListener('DOMContentLoaded', getCompletedTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskCompleted.addEventListener('click', removeTask);
  // Remove task and add it to completed task event
  taskList.addEventListener('click', addCompletedTask);
}

// Get Tasks from LocalStorage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
      // Create li element
      const taskItem = document.createElement('li');
      // Add class
      taskItem.className = 'collection-item';
      //Create elements and button, and embed them inside li element
      const taskContent = document.createElement('span');
      taskContent.className = 'task';
      taskContent.textContent = `${task[0]}`;

      const timeContent = document.createElement('span');
      timeContent.className = 'time-frame';
      timeContent.textContent = `${task[1]}`

      const completeBtn = document.createElement('button');
      completeBtn.className = 'secondary-content';
      completeBtn.textContent = 'completed'
      // Append the elements and button to li element
      taskItem.appendChild(taskContent);
      taskItem.appendChild(timeContent);
      taskItem.appendChild(completeBtn);
  
      // Append li to ul element
      taskList.appendChild(taskItem);
    });
  }


// Get Completed Tasks from LocalStorage
function getCompletedTasks() {
    let completedTasks = [];
    if(localStorage.getItem('completedTasks') === null){
      completedTasks = [];
    } else {
      completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
    }
  
    completedTasks.forEach(function(task){
      // Create li element
      const completedTaskItem = document.createElement('li');
      // Add class
      completedTaskItem.className = 'collection-x-item';
      //Create elements and button, and embed inside li element
      const completedTaskContent = document.createElement('span');
      completedTaskContent.className = 'task';
      completedTaskContent.textContent = `${task[0]}`;

      const completedTimeContent = document.createElement('span');
      completedTimeContent.className = 'time-frame';
      completedTimeContent.textContent = `${task[1]}`

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'clear-tasks';
      deleteBtn.textContent = 'delete'
      // Append the elements and button to li element
      completedTaskItem.appendChild(completedTaskContent);
      completedTaskItem.appendChild(completedTimeContent);
      completedTaskItem.appendChild(deleteBtn);
  
      // Append li to ul element
      taskCompleted.appendChild(completedTaskItem);
      console.log(task, taskCompleted);
    });
  }

  // Add Task to Incomplete Tasks
function addTask(e) {
    if(taskInput.value === '' || timeInput.value === '') {
      if (taskInput.value === '') alert('Add a task')
      else alert('Add a time');
    } else {
    // Create li element
    const taskItem = document.createElement('li');
    // Add class
    taskItem.className = 'collection-item';
    //Create elements and button, and embed inside li element
    const taskContent = document.createElement('span');
    taskContent.className = 'task';
    taskContent.textContent = `${taskInput.value}`;

    const timeContent = document.createElement('span');
    timeContent.className = 'time-frame';
    timeContent.textContent = `${timeInput.value}`

    const completeBtn = document.createElement('button');
    completeBtn.className = 'secondary-content';
    completeBtn.textContent = 'completed'
    // Append the elements and button to li element
    taskItem.appendChild(taskContent);
    taskItem.appendChild(timeContent);
    taskItem.appendChild(completeBtn);

    // Append li to ul element
    taskList.appendChild(taskItem);
    // Store in LocalStorage
    storeTaskInLocalStorage(taskInput.value, timeInput.value);
  
    // Clear input
    taskInput.value = '';
    timeInput.value = '';
  
    e.preventDefault();
    }
  }

// Store Incomplete Tasks in LocalStorage
function storeTaskInLocalStorage(task, time) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push([task, time]);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Store Completed Task in LocalStorage
function storeCompletedTaskInLocalStorage(tasks) {
    let completedTasks;
    if(localStorage.getItem('completedTasks') === null){
        completedTasks = [];
    } else {
        completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
    }
    completedTasks.push([tasks.children[0].textContent, tasks.children[1].textContent]);
  
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }

  // Remove Completed Tasks
function removeTask(e) {
    if(e.target.parentElement.classList.contains('collection-x-item')) {
      if(confirm('Are You Sure?')) {
        e.target.parentElement.remove();
  
        // Remove from LS
        removeCompletedTaskFromLocalStorage(e.target.parentElement);
      }
    }
}


  // Remove Incompleted task and add it to completed task event
function addCompletedTask(e) {
    if(e.target.parentElement.classList.contains('collection-item')) {
        e.target.parentElement.className = 'collection-x-item';
        e.target.textContent = 'delete';
        e.target.className = 'clear-task';
        taskCompleted.appendChild(e.target.parentElement);
        storeCompletedTaskInLocalStorage(e.target.parentElement); 
        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement);
        location.reload();
    }
  }

  // Remove Incomplete task from LocalStorage after moving to completed tasks
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let content = [taskItem.children[0].textContent, taskItem.children[1].textContent];

    tasks.forEach(function(task, index){
      console.log(task[0] == content[0]);
      if(task[0] == content[0] && task[1] == content[1]){
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


   // Remove Completed Task from LocalStorage
function removeCompletedTaskFromLocalStorage(taskItem) {
  let completedTasks;
  if(localStorage.getItem('completedTasks') === null){
    completedTasks = [];
  } else {
    completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
  }
  console.log(completedTasks)

  let content = [taskItem.children[0].textContent, taskItem.children[1].textContent];

  completedTasks.forEach(function(task, index){
    if(task[0] == content[0] && task[1] == content[1]){
      completedTasks.splice(index, 1);
    }
  });

  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}