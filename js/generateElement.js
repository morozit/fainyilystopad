// export const generateElement = (elem, text) => {
//   return () => {
//     let block = document.createElement(elem);
//     block.innerHTML = text;

//     return block;
//   }
// }

export const generateElement = (elem, text) => {
  const block = document.createElement(elem);
  block.innerHTML = text;
  return block; // Повертає сам створений елемент
};
