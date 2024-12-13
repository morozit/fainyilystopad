import { getCurrentYear } from "./getCurrentYear.js";
import { generateElement } from "./generateElement.js";

export const insertFooter = () => {
  let currentYear = getCurrentYear();
  console.log(currentYear);
  
  let text =
    `&copy; 2023-${currentYear} <a class="text-reset fw-bold" href="mailto:stk.legion.ter@gmail.com">СТК "ЛЕГІОН"</a>`;

  const footerBlock = generateElement('div', text);
  const footer = document.querySelector('footer');
  if (footer) {
    footer.appendChild(footerBlock);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  insertFooter();
});