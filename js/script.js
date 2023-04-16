const formSearchContainer = document.querySelector('[data-search="form-container"]');
const searchContainer = document.querySelector('[data-search="search-container"]');
const inputs = document.querySelectorAll('[data-todo="list"] input');
const toDoListContainer = document.querySelector('[data-todo="list"]');
const formTaskContainer = document.querySelector('[data-newTask="container"]');
const modelNode = document.querySelector('#model');

const cloneNodeModelTask = (text) => {
  const newElementTask = modelNode.cloneNode(true);
  const getParagraphInModel = newElementTask.querySelector('p');
  getParagraphInModel.insertAdjacentText('beforeend', text);
  newElementTask.removeAttribute('id');
  return newElementTask;
}

const inputSearchOnClick = ({ target, currentTarget }) => {
  const ifIsImg = target.tagName === 'IMG';
  if (ifIsImg) handleToggle(currentTarget, 'hidden');
}

const clearInputSearchOnSubmit = event => {
  event.preventDefault();
  event.target.reset();
}

const putTaskOnTop = (arrayEl, textInsert, className) => {
  arrayEl.forEach(arrItem => {
    const textArrItem = arrItem.innerText.toLowerCase();
    const checkIfIsSameText = textArrItem.includes(textInsert);
    arrItem.classList.remove(className);
    if (checkIfIsSameText) {
      toDoListContainer.prepend(arrItem);
    } else {
      arrItem.classList.add(className);
    }
  })
}

const PutTaskOnTopOnInput = ({ target }) => {
  const valueInput = target.value;
  const lis = toDoListContainer.querySelectorAll('li');
  putTaskOnTop([...lis], valueInput, 'hiddenTask');
}

const insertNewTaskInList = (text, insertPosition, option) => {
  const newLi = cloneNodeModelTask(text);
  insertPosition.insertAdjacentElement(option, newLi);
}

const InsertNewTaskInListOnSubmit = event => {
  event.preventDefault();
  const inputContent = event.target.newTask.value;
  const checkIfInputValueIsEmpty = inputContent.trim().length !== 0;
  if (checkIfInputValueIsEmpty)
    insertNewTaskInList(inputContent, toDoListContainer, 'beforeend');  
  event.target.reset();
}

const removeTaskOnClick = ({ target }) => {
  const checkIfElementClassIsTrash = target.classList[0] === 'trash';
  const parentInputP = target.parentElement;
  handleToggle(parentInputP, 'completed');
  if (checkIfElementClassIsTrash) parentInputP.remove();
}

const handleToggle = (element, ClassName) => element.classList.toggle(ClassName);

searchContainer.addEventListener('click', inputSearchOnClick);
formSearchContainer.addEventListener('submit', clearInputSearchOnSubmit);
formSearchContainer.search.addEventListener('input', PutTaskOnTopOnInput);
formTaskContainer.addEventListener('submit', InsertNewTaskInListOnSubmit);
toDoListContainer.addEventListener('click', removeTaskOnClick);