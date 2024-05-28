import { getGamesFetch } from "./assets/js/api_request";
var _ = import("lodash");
const cardsContainer = document.querySelector(".cards_container");
const btnCategory = document.querySelectorAll(".btn_category");
const navFilter = document.querySelector(".nav_filter");
const btns = document.querySelector(".btns");
// NodeLIST / HTMLCollection to ARRAY
const btnCategoryList = [...btnCategory];
// CONSOLEOS : )
console.log(cardsContainer);
console.log(btnCategory);
console.log(navFilter);
// Funciones
const templateCardProduct = (product) => {
  const { id, title, thumbnail, genre, short_description, plataform, price } =
    product;
  return `<div class="card">
   <div class="title-img-card">
     <h3>${title.toUpperCase()}</h3> 
     <img src=${thumbnail} alt="" />
   </div>
      <div class="info-card">
        <span>${genre}</span>
        <p>${short_description}</p>
        <strong>u$s${price}</strong>
      </div class="containe-btn-add">
        <button class="btn-add-card" data-id=${id}>
        <i class="fa-solid fa-download"></i></button>
       
    </div>`;
};
const renderCard = (games) => {
  cardsContainer.innerHTML = games.map(templateCardProduct).join("");
};
const bnt_active = (e) => {
  if (!e.target.classList.contains("btn_category")) {
    return;
  }
  if (!e.target.classList.contains("btn_active")) {
    btnCategoryList.forEach((elem) => elem.classList.remove("btn_active"));
    e.target.classList.add("btn_active");
  }
};
const filterGames = async (e) => {
  const games = await getGamesFetch();
  if (!e.target.classList.contains("btn_category")) {
    return;
  }
  if (e.target.dataset.category === "all") {
    return renderCard(games);
  }
  let gamesGenre = [];
  gamesGenre = games.filter(
    (game) => game.genre === e.target.getAttribute("data-category")
  );
  renderCard(gamesGenre);
};
const loadWindow = async () => {
  const games = await getGamesFetch();
  renderCard(games);
};
const init = async () => {
  window.addEventListener("DOMContentLoaded", loadWindow);
  btns.addEventListener("click", bnt_active);
  btns.addEventListener("click", filterGames);
};

init();
