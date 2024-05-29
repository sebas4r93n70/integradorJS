import { includes } from "lodash";
import { getGamesFetch } from "./assets/js/api_request";
var _ = import("lodash");
const cardsContainer = document.querySelector(".cards_container");
const btnCategory = document.querySelectorAll(".btn_category");
const navFilter = document.querySelector(".nav_filter");
const btns = document.querySelector(".btns");
const formFilter = document.querySelector(".form_filter");
const inputSearch = document.querySelector(".input_search");

// NodeLIST / HTMLCollection to ARRAY
const btnCategoryList = [...btnCategory];
// CONSOLEOS : )
console.log(formFilter);
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
        <strong>u$s ${price}</strong>
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
const handledSearch = async (e) => {
  e.preventDefault();
  const inputValue = inputSearch.value.trim();
  if (!inputValue) {
    cardsContainer.innerHTML =
      "DEBES INGRESAR AUNQUE SEA 3 LETRAS PARA OBTENER BUENOS RESULTADOS";
    return;
  }
  let games = await getGamesFetch();
  console.log(inputValue);
  let gamesSearch = [];
  gamesSearch = games.filter((game) =>
    game.title.toLowerCase().includes(inputValue.toLowerCase())
  );
  console.log(gamesSearch);
  if (!gamesSearch.length) {
    cardsContainer.innerHTML = `<div> <p>Lo siento, no hemos encontrado tu juego... intenta con otro nombre o las 3 primeras letras.</p><img src="/img/gamepad-broken-rbg.png" alt="" />
   </div>`;
    btnCategoryList.forEach((elem) => elem.classList.remove("btn_active"));
    formFilter.reset();
    inputSearch.blur();
    return;
  }
  renderCard(gamesSearch);
  window.scroll({
    top: 765,
    behavior: "smooth",
  });
  btnCategoryList.forEach((elem) => elem.classList.remove("btn_active"));
  formFilter.reset();
  inputSearch.blur();
};
const loadWindow = async () => {
  const games = await getGamesFetch();
  renderCard(games);
};
const init = async () => {
  window.addEventListener("DOMContentLoaded", loadWindow);
  btns.addEventListener("click", bnt_active);
  btns.addEventListener("click", filterGames);
  formFilter.addEventListener("submit", handledSearch);
};

init();
