const editBtn = document.querySelector('.profile__edit-btn');
  let isEditing = false;

  editBtn.addEventListener('click', () => {
    if (!isEditing) {
      enableEditing();
    } else {
      saveProfile();
    }
  });

  function enableEditing() {
    isEditing = true;
    editBtn.textContent = 'Зберегти';

    document.querySelectorAll('.profile__value').forEach(dd => {
      const value = dd.textContent.trim();
      const input = document.createElement('input');
      input.type = 'text';
      input.name = dd.id.replace('profile-', '');
      input.value = value;
      input.classList.add('profile__input');

      dd.innerHTML = '';
      dd.appendChild(input);
    });
  }

  async function saveProfile() {
    const inputs = document.querySelectorAll('.profile__input');
    const data = {};

    inputs.forEach(input => {
      data[input.name] = input.value;
    });

    try {
      // Надсилаємо POST-запит (можна адаптувати під твою структуру API)
      const response = await fetch('update-profile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const updatedData = await response.json();

      // Після відповіді від сервера оновлюємо значення
      for (const key in updatedData) {
        const dd = document.querySelector(`#profile-${key}`);
        if (dd) {
          dd.textContent = updatedData[key];
        }
      }

      // Повертаємо кнопку
      editBtn.textContent = 'Редагувати';
      isEditing = false;

    } catch (error) {
      console.error('Помилка збереження профілю:', error);
      alert('Не вдалося зберегти зміни. Спробуйте пізніше.');
    }
  }