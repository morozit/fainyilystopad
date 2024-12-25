document.querySelector('#login-traditional').addEventListener('click', () => {
  document.querySelector('.auth-form').innerHTML = `
    <form id="traditional-login">
      <input type="text" name="username" placeholder="Логін" required />
      <input type="password" name="password" placeholder="Пароль" required />
      <button type="submit">Увійти</button>
    </form>`;
});

document.querySelector('#login-google').addEventListener('click', () => {
  window.location.href = '/auth/google'; // Направлення на OAuth endpoint
});

document.querySelector('#login-otp').addEventListener('click', () => {
  document.querySelector('.auth-form').innerHTML = `
    <form id="otp-login">
      <input type="email" name="email" placeholder="Email" required />
      <button type="submit">Отримати код</button>
    </form>`;
});
