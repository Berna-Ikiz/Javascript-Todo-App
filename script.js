//UI variables
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');

const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

//load items
loadItems();

eventListeners();

//call event Listeners
function eventListeners() {
    //Submit Event
    form.addEventListener('submit', addNewItem);
    //delete an Item  
    taskList.addEventListener('click', deleteItem);

    //delete All Items
    btnDeleteAll.addEventListener('click', deleteAllItems)
}

function createItem(text) {
    //create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    //create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#')
    a.innerHTML = '<i class="fas fa-times"></i>';

    //add a to li
    li.appendChild(a);

    //add li to ul
    taskList.appendChild(li)
}

function loadItems() {
    items = getItemsFromLocalStorage();
    items.forEach(function (item) {
        createItem(item);
    });
}

//get item from localstorage
function getItemsFromLocalStorage() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

//set item to localstorage
function setITemtoLocalStorage(text) {
    items = getItemsFromLocalStorage();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items))

}

//delete item from localstorage
function deleteItemFromLocalStorage(text) {
    items = getItemsFromLocalStorage();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

//Add new item
function addNewItem(e) {

    if (input.value === '') {
        alert('add new item')
    } else {
        createItem(input.value);
        //save to localstorage
        setITemtoLocalStorage(input.value);

        //clear input
        input.value = '';
    }
    e.preventDefault()
}


function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm('Are you sure')) {
            e.target.parentElement.parentElement.remove();
            //delete item from localstorage
            deleteItemFromLocalStorage(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteAllItems(e) {
    if (confirm('are you sure?')) {
        //taskList.innerHTML = '';
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
        }
        localStorage.clear()
    }
    e.preventDefault();
}