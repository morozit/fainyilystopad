'use strict';

const burger = document.getElementById("burger");
const siteNav = document.getElementById("siteNav");

burger.addEventListener("click", () => {
  siteNav.classList.toggle("active");
});

document.querySelectorAll(".site-nav__link").forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("active");
  });
});
