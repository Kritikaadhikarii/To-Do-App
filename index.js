const element = document.getElementById('currentTime');
  
setInterval(function () {
  const currentDate = new Date();
  element.innerText = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
}, 1000);

// for current time
let currentDate = new Date();
let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
console.log(time);


// for to-do list
const lists = document.getElementById("list");
const create_buttons = document.getElementById("create");
let todos = [];
create_buttons.addEventListener('click', CreateNewTodo);


function CreateNewTodo () {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }


    todos.unshift(item);


    const { items, inputs } = CreateTodoElement(item);


    lists.prepend(items);


    inputs.removeAttribute("disabled");
    inputs.focus();


    Save();
}




function CreateTodoElement(item) {
    const items = document.createElement("div");
    items.classList.add("item");


    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;


    if (item.complete) {
        items.classList.add("complete");
    }


    const inputs = document.createElement("input");
    inputs.type = "text";
    inputs.value = item.text;
    inputs.setAttribute("disabled", "");


    const actionss = document.createElement("div");
    actionss.classList.add("actions");


    const edit_buttons = document.createElement("button");
    edit_buttons.classList.add("material-icons");
    edit_buttons.innerText = "edit";


    const remove_buttons = document.createElement("button");
    remove_buttons.classList.add("material-icons", "remove-button");
    remove_buttons.innerText = "remove_circle";


    actionss.append(edit_buttons);
    actionss.append(remove_buttons);


    items.append(checkbox);
    items.append(inputs);
    items.append(actionss);


    // EVENTS
    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;


        if (item.complete) {
            items.classList.add("complete");
        } else {
            items.classList.remove("complete");
        }


        Save();
    });


    inputs.addEventListener("input", () => {
        item.text = inputs.value;
    });


    inputs.addEventListener("blur", () => {
        inputs.setAttribute("disabled", "");
        Save();
    });


    edit_buttons.addEventListener("click", () => {
        inputs.removeAttribute("disabled");
        inputs.focus();
    });


    remove_buttons.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id);


        items.remove();


        Save();
    });


    return { items, inputs, edit_buttons, remove_buttons }
}


function DisplayTodos() {
    Load();


    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];


        const { items } = CreateTodoElement(item);


        lists.append(items);
    }
}


DisplayTodos();


function Save() {
    const save = JSON.stringify(todos);
   
    localStorage.setItem("my_todos", save);
}


function Load() {
    const data = localStorage.getItem("my_todos");


    if (data) {
        todos = JSON.parse(data);
    }
}


