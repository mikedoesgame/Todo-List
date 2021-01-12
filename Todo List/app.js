//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

//Functions
//Add Todo Function
function addTodo(e) {
    //Prevent form form submitting
    e.preventDefault();
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Todo Li
    const newTodo = document.createElement("li");
    //Submits users input
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    //Sticking the li inside of the div
    todoDiv.appendChild(newTodo);
    //Add Todo to Local Storage
    saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class ="fas fa-check"></i>';
    completedButton.classList.add("completed-button");
    //Sticking the Completed Button inside of the div
    todoDiv.appendChild(completedButton);
    //Check Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
    trashButton.classList.add("trash-button");
    //Sticking the Trash Button inside of the div
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clears users input
    todoInput.value = "";
}

//Complete / Delete Function
function deleteCheck(e) {
    const item = e.target;
    //Check Mark
    if (item.classList[0] === "completed-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed-task");
    }
    //Delete todo
    if (item.classList[0] === "trash-button") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall-anim");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }
}

//Filter Function
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed-task")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed-task")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

//Local Storage Functions
function saveLocalTodos(todo) {
    //Check Present Todos
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    //Check Present Todos
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
     //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Todo Li
    const newTodo = document.createElement("li");
    //Submits users input
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    //Sticking the li inside of the div
    todoDiv.appendChild(newTodo);
    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class ="fas fa-check"></i>';
    completedButton.classList.add("completed-button");
    //Sticking the Completed Button inside of the div
    todoDiv.appendChild(completedButton);
    //Check Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
    trashButton.classList.add("trash-button");
    //Sticking the Trash Button inside of the div
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    //Check Present Todos
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}