//UI variables
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');

const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');

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

//Add new item
function addNewItem(e) {

    if (input.value === '') {
        alert('add new item')
    } else {
        //create li
        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary';
        li.appendChild(document.createTextNode(input.value));

        //create a
        const a = document.createElement('a');
        a.classList = 'delete-item float-right';
        a.setAttribute('href', '#')
        a.innerHTML = '<i class="fas fa-times"></i>';

        //add a to li
        li.appendChild(a);

        //add li to ul
        taskList.appendChild(li)

        //clear input
        input.value = '';
        console.log(li);
    }
    e.preventDefault()
}


function deleteItem(e) {
    if (confirm('Are you sure')) {
        if (e.target.className === 'fas fa-times') {
            e.target.parentElement.parentElement.remove();
        }
    }
    e.preventDefault();
}

function deleteAllItems(e) {
    if (confirm('are you sure?')) {
        taskList.innerHTML = '';
    }
    e.preventDefault();
}