const addTodo = document.querySelector("#addTodo");
const add = document.querySelector("#addNew");
const todoList = document.querySelector("#TodoList");
const savedTodo = JSON.parse(localStorage.getItem("listOfTodoObjects")) || [];

todoList.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
        let removedListItem = e.target.parentElement;
        let removedItemText = removedListItem.innerText.slice(0, -6)
        console.log(removedItemText);
        for (let i = 0; i < savedTodo.length; i++) {
            if (savedTodo[i].todoText == removedItemText) {
                savedTodo.splice(i, 1);
            }
            localStorage.setItem("listOfTodoObjects", JSON.stringify(savedTodo));
            break;
        }
        e.target.parentElement.remove();
    }
})

todoList.addEventListener("click", function (e) {
    let clickedListItem = e.target;
    let clickedItemText = clickedListItem.innerText.slice(0, -6)
    clickedListItem.classList.toggle("completed");
    for (let i = 0; i < savedTodo.length; i++) {
        if (savedTodo[i].todoText == clickedItemText) {
            savedTodo[i].crossedOut = (savedTodo[i].crossedOut ? false : true);
        }
        localStorage.setItem("listOfTodoObjects", JSON.stringify(savedTodo));
        break;
    }
})

addTodo.addEventListener("submit", function (event) {
    event.preventDefault();
    const newTodo = makeTodo(
        add.value
    );
    todoList.appendChild(newTodo);
    add.value = '';
})

//print from storage
for (let i = 0; i < savedTodo.length; i++) {
    let todo = document.createElement('li');
    const removeButton = document.createElement("button");
    todo.innerText = savedTodo[i].todoText;
    if (savedTodo[i].crossedOut === true) {
        todo.classList.toggle("completed");
    }
    removeButton.innerText = "Remove";
    todo.appendChild(removeButton);
    todoList.appendChild(todo);
}

function makeTodo(text) {
    const todoObject = {
        todoText: "",
        crossedOut: false
    };
    const todo = document.createElement('li');
    const removeButton = document.createElement("button");
    todo.innerText = text;
    todoObject.todoText = text;
    savedTodo.push(todoObject);
    localStorage.setItem("listOfTodoObjects", JSON.stringify(savedTodo));
    removeButton.innerText = "Remove";
    todo.appendChild(removeButton);
    return todo;
}