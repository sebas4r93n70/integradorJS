// Variables
const cartIcon = document.getElementById("cart_icon");
const cartContainer = document.querySelector(".cart_container");
const cardsContainer = document.querySelector(".cards_container");
// Console
console.log("tada!", cardsContainer);
// Funciones
const cartToggle = () => {
  cartContainer.classList.toggle("cart_toggle");
};
const itemTemplateCart = (card) => {
  return;
};
const addGamesCart = () => {};
export const initCart = () => {
  cartIcon.addEventListener("click", cartToggle);
};
