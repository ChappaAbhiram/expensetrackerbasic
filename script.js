const button = document.getElementById('button');
const myform = document.getElementById('myForm');
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const cont = document.querySelector('.containers');

myform.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const myobj = {
    amount: document.getElementById('amount').value,
    description: document.getElementById('description').value,
    category: document.getElementById('category').value
  };
  showOnUserScreen(myobj);
  e.target.amount.value = '';
  e.target.description.value = '';
}

function showOnUserScreen(myobj) {
  const li = document.createElement('li');
  li.innerHTML = myobj.amount+'-'+myobj.description+'-'+myobj.category;

  const deleteButton = document.createElement('button');
  deleteButton.appendChild(document.createTextNode('Delete Expense'));

  const editButton = document.createElement('button');
  editButton.appendChild(document.createTextNode('Edit Expense'));

  li.appendChild(deleteButton);
  li.appendChild(editButton);
  cont.appendChild(li);
  saveData();

  editButton.addEventListener('click', function(e) {
    document.getElementById('amount').value = myobj.amount;
    document.getElementById('category').value = myobj.category;
    document.getElementById('description').value = myobj.description;

    e.target.parentElement.remove();
    saveData();
  }, false);

  deleteButton.addEventListener('click', function(e) {
    e.target.parentElement.remove();
    saveData();
  }, false);
}

function saveData() {
  localStorage.setItem("data", cont.innerHTML);
}

window.addEventListener('load', function (e) {
    cont.innerHTML = localStorage.getItem("data");
    cont.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
          const li = e.target.parentElement;
          const textContent = li.textContent;
          let amount = "";
          let description = "";
          let category = "";
          let currentIndex = 0;
          for (let i = 0; i < textContent.length; i++) {
            if (textContent[i] === "-") {
              currentIndex++;
            } else {
              if (currentIndex === 0) {
                amount += textContent[i];
              } else if (currentIndex === 1) {
                description += textContent[i];
              } else if (currentIndex === 2) {
                category+=textContent[i];
              }
            }
          }
          if (e.target.textContent === 'Edit Expense') {
            document.getElementById('amount').value = amount.trim();
            document.getElementById('description').value = description.trim();
            const select = document.getElementById('category');
            for (let i = 0; i < select.options.length; i++) {
              if (select.options[i].value === category) {
                select.selectedIndex = i;
                break;
              }
            }
            li.remove();
            saveData();
          } 
            else if (e.target.textContent === 'Delete Expense') {
            li.remove();
            saveData();
          }
        }
      });
    });
  
  
  
  

