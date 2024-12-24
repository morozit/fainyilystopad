'use strict';

const body = document.querySelector('body');
const table = document.querySelector('table');
const form = document.querySelector('form');
const thead = table.querySelector('thead tr');
const tbody = table.querySelector('tbody');
const tableRows = document.querySelectorAll('table tbody tr');

const sortState = {
  column: null,
  order: 'asc',
};
let selectedElement = null;

// Масив, в якому зберігатимуться дані про працівників
let athletes = [];

// редагування по подвійному кліці  //!не працює після першого редагування
tbody.addEventListener('dblclick', (even) => {
  const selectedElementDblClick = even.target;

  if (selectedElementDblClick.tagName === 'TD') {
    // Отримати поточне значення комірки
    const currentValue = selectedElementDblClick.textContent;

    // Створити поле введення для редагування
    const input = document.createElement('input');

    input.type = 'text';
    input.value = currentValue;

    // Замінити вміст комірки полем введення
    selectedElementDblClick.textContent = '';
    selectedElementDblClick.appendChild(input);

    // Фокус на полі введення
    input.focus();

    // Обробка події втрати фокусу (при завершенні редагування)
    input.addEventListener('blur', () => {
      // Отримати нове значення з поля введення
      const newValue = input.value;

      // Оновити значення комірки
      selectedElementDblClick.textContent = newValue;

      getAthleteDataFromRow();
      // updateTable();
    });
  }
});

// Сортування
thead.addEventListener('click', even => {
  const targetHeader = even.target;

  const headerIndex = Array.from(thead.children).indexOf(targetHeader);

  // Перевіряємо, чи натиснуто на новий заголовок
  if (sortState.column !== headerIndex) {
    // Якщо натиснуто на новий заголовок, скидаємо напрямок сортування до 'asc'
    sortState.order = 'asc';
  } else {
    // Якщо натиснуто на поточний заголовок, змінюємо напрямок сортування
    sortState.order = sortState.order === 'asc' ? 'desc' : 'asc';
  }

  // Оновлюємо поточний стовпець сортування
  sortState.column = headerIndex;

  const sortRows = Array.from(document.querySelectorAll('table tbody tr'));

  sortRows.sort((a, b) => {
    const aTextContent = a.children[headerIndex].textContent;
    const bTextContent = b.children[headerIndex].textContent;

    return (aTextContent.localeCompare(bTextContent))
      * (sortState.order === 'asc' ? 1 : -1);
  });

  tbody.innerHTML = '';

  sortRows.forEach(row => {
    tbody.appendChild(row);
  });
});

// виділення рядка
tbody.addEventListener('click', (even) => {
  const target = even.target;

  if (selectedElement && selectedElement.classList.contains('active')) {
    selectedElement.classList.remove('active');
  }

  selectedElement = target.closest('tr');
  selectedElement.classList.add('active');
});

// Обробник події submit форми
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Отримуємо значення полів форми
  const nameInput = form.querySelector('input[name="name"]');
  const birthDateInput = form.querySelector('input[name="birthDate"]');
  const rozryadSelect = form.querySelector('select[name="rozryad"]');
  const teamNameInput = form.querySelector('input[name="teamName"]');
  const distanceClassInput = form.querySelector('select[name="distanceClass"]');

  const nam = nameInput.value.trim();
  const birthDate = birthDateInput.value.trim();
  const rozryad = rozryadSelect.value.trim();
  const teamName = teamNameInput.value.trim();
  const distanceClass = distanceClassInput.value.trim();

  // Перевіряємо валідність введених даних
  let isValid = true;
  let errorMessage = '';

  if (!isValidName(nam)) {
    isValid = false;
    errorMessage += '- Name should have at least 4 letters.\n';
  }

  if (!isValidTeamName(teamName)) {
    isValid = false;
    errorMessage += '- teamName should be between 18 and 90.\n';
  }

  if (!isValidDistanceClass(distanceClass)) {
    isValid = false;
    errorMessage += '- distanceClass should be a valid number.\n';
  }

  // Виводимо повідомлення про помилки, якщо дані не валідні
  if (!isValid) {
    pushNotification('Error', errorMessage, 'error');

    return;
  }

  // Створюємо об'єкт працівника
  const athlete = {
    nam,
    birthDate,
    rozryad,
    teamName,
    distanceClass,
  };

  // Додаємо працівника до масиву і відображаємо його в таблиці
  athletes.push(athlete);
  updateTable();

  // Очищаємо значення полів форми
  form.reset();

  // Виводимо повідомлення про успішне додавання працівника
  pushNotification('Success', 'New athlete has been added.', 'success');
});

// Проходимося по кожному рядку і отримуємо дані про працівника
function getAthleteDataFromRow() {
  if (athletes.length > 0) {
    athletes = [];
  }

  tableRows.forEach((row) => {
    const cells = row.querySelectorAll('td');
    const nam = cells[0].textContent;
    const birthDate = cells[1].textContent;
    const rozryad = cells[2].textContent;
    const teamName = cells[3].textContent;
    const distanceClass = cells[4].textContent;

    // Створюємо об'єкт працівника і додаємо його до масиву
    const athlete = {
      nam,
      birthDate,
      rozryad,
      teamName,
      distanceClass,
    };

    athletes.push(athlete);
  });
}

getAthleteDataFromRow();
//!  додаткові функції

// Функція для додавання повідомлення у контейнер
function pushNotification(title, description, type) {
  const notification = document.createElement('div');

  notification.classList.add('notification', type);

  notification.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
  `;

  body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
};

// Функція для перевірки валідності поля "Name"
function isValidName(nam) {
  return nam.length >= 4;
};

// Функція для перевірки валідності поля "teamName"
function isValidTeamName (teamName) {
  return teamName.length >= 2;
};

// Функція для перевірки валідності поля "distanceClass"
function isValidDistanceClass(distanceClass) {
  return distanceClass.length >= 1;
};

// Функція для додавання працівника до таблиці
function addAthleteToTable(athlete) {
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>${athlete.nam}</td>
    <td>${athlete.birthDate}</td>
    <td>${athlete.rozryad}</td>
    <td>${athlete.teamName}</td>
    <td>${athlete.distanceClass}</td>
  `;
  tbody.appendChild(newRow);
};

// Функція для оновлення відображення таблиці
function updateTable() {
  // Очищаємо поточне вміст таблиці
  tbody.innerHTML = '';

  // Додаємо кожного працівника до таблиці
  athletes.forEach((athlete) => {
    addAthleteToTable(athlete);
  });
};
