// VARIABLES
const messageBox = document.getElementById('messageBox'),
    sendBtn = document.getElementById('sendBtn'),
    tasksList = document.querySelector('.tasksList'),
    form = document.querySelector('.form'),
    errorContainer = document.createElement('DIV');
let tasks = [];


loadEvents();


// EVENT LISTENERS
function loadEvents() {
    window.addEventListener('DOMContentLoaded', () => {
        messageBox.focus();
    })

    sendBtn.addEventListener('click', addTask);

    window.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            addTask(event);
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        createHTML();
    })
}



// FUNCTIONS
function addTask(e) {
    e.preventDefault();

    if (messageBox.value == '') {
        createError('Por favor, escribe algo.');
        return;
    }

    createHTML();
}



function createHTML() {
    const taskValue = messageBox.value.trim();
    const taskObj = {
        id: Date.now(),
        task: taskValue
    }

    //Filling the array with objects that contain information from the textarea
    tasks = [...tasks, taskObj]

    clearHTML();

    //If there is at least one element in the array, this creates the appropiate HTML tag to the list with the content
    if (tasks.length > 0) {
        tasks.forEach(task => {
            const element = document.createElement('LI'),
                deleteBtn = document.createElement('A');

            deleteBtn.innerText = 'X';

            deleteBtn.onclick = () => {
                deleteTask(task.id);
            }

            element.innerText = task.task;
            element.appendChild(deleteBtn);
            tasksList.appendChild(element);

            //When you click the delete button, if the tag doesn't have any message, it's deleted
            if (task.task === '') {
                deleteBtn.parentElement.remove();
            }
        })
    }

    messageBox.value = '';
    messageBox.focus();

    syncLocalStorage();
}



function clearHTML() {
    while (tasksList.firstChild) {
        tasksList.removeChild(tasksList.firstChild);
    }
}



function createError(message) {
    const error = document.createElement('P');

    clearError();

    errorContainer.classList.add('errorContainer');

    form.appendChild(errorContainer)
    error.innerText = message;
    error.classList.add('error');

    errorContainer.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, 2000);
}



function clearError() {
    while (errorContainer.firstChild) {
        errorContainer.removeChild(errorContainer.firstChild);
    }
}



function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    createHTML();
}

function syncLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}