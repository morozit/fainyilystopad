'use strict';

// const burger = document.getElementById("burger");
// const siteNav = document.getElementById("siteNav");

// burger.addEventListener("click", () => {
//   siteNav.classList.toggle("active");
// });

// document.querySelectorAll(".site-nav__link").forEach(link => {
//   link.addEventListener("click", () => {
//     siteNav.classList.remove("active");
//   });
// });


export function initBurgerMenu() {
  const burger = document.getElementById("burger");
  const siteNav = document.getElementById("siteNav");

  if (burger && siteNav) {
    burger.addEventListener("click", () => {
      siteNav.classList.toggle("active");
    });

    document.querySelectorAll(".header__nav-link").forEach(link => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("active");
      });
    });
  }
}
