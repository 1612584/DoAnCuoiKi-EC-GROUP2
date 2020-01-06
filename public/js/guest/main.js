function title(name) {
    return `
    <a class="dropdown-item dropdown-toggle">
        ${name}
    </a>
    `
}

function smallChild(name) {
    return `
        <li>
            <a class="dropdown-item" href="#">${name}</a>
        </li>
    `
}

function bigChild(child) {
    return `
        <ul class="dropdown-menu">
            ${child}
        </ul>
    `
}

function parentElement(title, child) {
    return `
    <li class="nav-item dropdown">
        ${title}
        ${bigChild(child)}
    </li>
    `
}

var categoryTag = $("#categoryDropdown")

function haveChild(id, list) {
    for (const element of list) {
        if (id == element.parent_category){
            return true;
        }
    }
    return false;
}

function loadCategoryDropdown(id,list) {
    var htmlStr = ''
    list.forEach(element => {
        if (id === element.parent_category) {
            if (haveChild(element._id, list) == true){
                htmlStr +=  parentElement(title(element.name), loadCategoryDropdown(element._id, list))
            }
            else {
                htmlStr += smallChild(element.name)
            }
        }
    });
    return htmlStr;
}

async function load(){
    const response = await fetch('/category/api/list');
    const category = await response.json();
    const htmlDropdown = await loadCategoryDropdown(null, category);
    categoryDrop = document.getElementById('categoryDropdown')
    console.log(htmlDropdown)
    categoryDrop.innerHTML = htmlDropdown;
}

window.onload = load();    
