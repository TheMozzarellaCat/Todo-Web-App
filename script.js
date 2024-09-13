const taskText = document.querySelector("#add-task");
const container2 = document.querySelector("#new-task-container");
const showAll = document.querySelector(".show-all");
const showActive = document.querySelector(".show-active");
const showCompleted = document.querySelector(".show-completed");

let optionCreated = false;

taskText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && taskText.value.trim()) {
        createTask();
        taskText.value = "";
    }
});

function createTask() {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add("task-background");
    taskContainer.innerHTML = `
        <div class="check-task">
            <input type="checkbox" class="checkbox">
            <p class="task-text">${taskText.value}</p>
        </div>
        <div class="close-task-icon"></div>`;

    container2.appendChild(taskContainer);

    updateFirstTask();
    updateItemsLeft();

    const closeTask = taskContainer.querySelector(".close-task-icon");
    closeTask.addEventListener('click', () => {
        taskContainer.remove();
        updateItemsLeft();
        updateFirstTask();
    });

    const checkbox = taskContainer.querySelector(".checkbox");
    checkbox.addEventListener('change', updateItemsLeft);

    if (!optionCreated) {
        createOptionContainer();
    }
}

function createOptionContainer() {
    const optionContainer = document.createElement('div');
    optionContainer.classList.add("option-container");
    optionContainer.innerHTML = `
        <span class="items-left">1 items left</span>
        <span class="clear-completed">Clear Completed</span>`;

    const clearCompletedButton = optionContainer.querySelector('.clear-completed');
    clearCompletedButton.addEventListener('click', clearCompletedTasks);

    container2.parentElement.appendChild(optionContainer);
    const footer = document.querySelector("footer")
    footer.style.display = "flex"
    if(window.screen.width >= 1440){
        optionContainer.appendChild(footer)
    }
    optionCreated = true;
}

function updateItemsLeft() {
    const itemsLeft = document.querySelectorAll(".task-background .checkbox:not(:checked)").length;
    const itemsLeftText = document.querySelector(".items-left");
    if (itemsLeftText) {
        itemsLeftText.textContent = `${itemsLeft} items left`;
    }
}

function clearCompletedTasks() {
    document.querySelectorAll(".task-background .checkbox:checked").forEach(checkbox => {
        checkbox.closest('.task-background').remove();
    });
    updateItemsLeft();
    updateFirstTask();
}

function updateFirstTask() {
    document.querySelectorAll(".task-background").forEach(task => task.classList.remove("first-task"));
    const firstTask = document.querySelector(".task-background");
    if (firstTask) {
        firstTask.classList.add("first-task");
    }
}

showAll.addEventListener('click', () => filterTasks('all'));
showActive.addEventListener('click', () => filterTasks('active'));
showCompleted.addEventListener('click', () => filterTasks('completed'));

const removeActive = () =>{
    showAll.classList.remove("active")
    showActive.classList.remove("active")
    showCompleted.classList.remove("active")
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll(".task-background");
    tasks.forEach(task => {
        const checkbox = task.querySelector(".checkbox");
        if (filter === 'all') {
            task.style.display = 'flex';
            removeActive()
            showAll.classList.add("active")
        } else if (filter === 'active') {
            task.style.display = checkbox.checked ? 'none' : 'flex';
            removeActive()
            showActive.classList.add("active")
        } else if (filter === 'completed') {
            task.style.display = checkbox.checked ? 'flex' : 'none';
            removeActive()
            showCompleted.classList.add("active")
        }
    });
}


// Chinease ahhhh fucking function no idea what is does tbh too late to ponder bout it
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    const footer = document.querySelector("footer")

    if(window.screen.width >= 1440){
        footer.style.display = "none"
    }
});
const themeIcon = document.getElementById('themeSwitcher')
let iconImageControl = 1
const mainImage = document.querySelector("main")
themeIcon.addEventListener('click', () => {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    if(iconImageControl == 0){
        themeIcon.src = "images/icon-sun.svg"
        mainImage.style.backgroundImage = "url(images/bg-mobile-dark.jpg)"
        iconImageControl++
    }else{
        themeIcon.src = "images/icon-moon.svg"
        mainImage.style.backgroundImage = "url(images/bg-mobile-light.jpg)"
        iconImageControl--
    }
});