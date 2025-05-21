export function initloginModal() {
  console.log('🔒 initloginModal запущено');

  const loginBtn = document.getElementById("login");
  const loginModal = document.getElementById("loginModal");
  const closeModalBtn = document.getElementById("closeModal");

  if (!loginBtn || !loginModal || !closeModalBtn) {
    console.warn('❌ loginModal не знайдено в DOM');
    return;
  }

  // Відкриття модального вікна
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Щоб не переходило за посиланням
    loginModal.classList.add("active");
  });

  // Закриття по кнопці
  closeModalBtn.addEventListener("click", () => {
    loginModal.classList.remove("active");
  });

  // Закриття по кліку за межами вікна
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove("active");
    }
  });
}
