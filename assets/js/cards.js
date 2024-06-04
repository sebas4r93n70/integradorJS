import { gamesFetch } from "/assets/js/api_request";
var _ = import("lodash");
const cardsContainer = document.querySelector(".cards_container");
const btnCategory = document.querySelectorAll(".btn_category");
const btns = document.querySelector(".btns");
const formFilter = document.querySelector(".form_filter");
const inputSearch = document.querySelector(".input_search");
const numberPage = document.getElementById("number_page");
const arrowsBtns = document.querySelector(".btn_cards_arrows");
const arrow = document.querySelectorAll(".arrow");

// NodeLIST / HTMLCollection to ARRAY

const btnCategoryList = [...btnCategory];
const arrowList = [...arrow];
// CONSOLEOS : )

// App State
const appState = {
  currentCategory: "all",
  page: 0,
  totalPage: null,
  cantCards: 12,
  inputSearchValue: null,
};

// Funciones
const getGamesByGenre = async (category) => {
  const dataGamesAll = await gamesFetch();
  if (category === "all") {
    return dataGamesAll;
  } else {
    return dataGamesAll.filter((game) => game.genre === category);
  }
};
const getdataGamesByAppState = async () => {
  const { currentCategory, page, cantCards, totalPage, inputSearchValue } =
    appState;
  if (inputSearchValue === null) {
    const dataGames = await getGamesByGenre(currentCategory);
    const dataGamesChunk = (await _).chunk(dataGames, cantCards);
    appState.currentCategory = currentCategory;
    appState.inputSearchValue = null;
    appState.totalPage = dataGamesChunk.length;
    return dataGamesChunk[page];
  }
  if (inputSearchValue.length > 0) {
    appState.currentCategory = "all";
    const dataGames = await getGamesByGenre(currentCategory);
    const dataGamesFilter = dataGames.filter((game) =>
      game.title.toLowerCase().includes(inputSearchValue.toLowerCase())
    );
    const dataGamesChunk = (await _).chunk(dataGamesFilter, cantCards);
    appState.totalPage = dataGamesChunk.length;
    return dataGamesChunk[page];
  }
};
const templateCardProduct = (product) => {
  const { id, title, thumbnail, genre, short_description, plataform, price } =
    product;
  return `<div class="card">
   <div class="title-img-card">
     <h3 title='${title}'>${title.toUpperCase()}</h3> 
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
const bntActive = (e) => {
  if (!e.target.classList.contains("btn_category")) {
    return;
  }
  if (!e.target.classList.contains("btn_active")) {
    btnCategoryList.forEach((elem) => elem.classList.remove("btn_active"));
    e.target.classList.add("btn_active");
  }
};
const cleanBtns = () => {
  return btnCategoryList.forEach((elem) => elem.classList.remove("btn_active"));
};
const numPageInit = () => {
  if (appState.page + 1 === appState.totalPage) {
    arrowList.map((arrow) => arrow.classList.add("out"));
    return (numberPage.innerHTML = appState.page + 1);
  }
  return (numberPage.innerHTML = appState.page + 1);
};
const arrowRigth = () => {
  if (appState.page === appState.totalPage - 1) {
    return;
  }
  appState.page += 1;
  numberPage.innerHTML = appState.page + 1;
  if (appState.page === appState.totalPage - 1) {
    arrowList[1].classList.add("out");
  }
};
const arrowLeft = () => {
  appState.page -= 1;
  numberPage.innerHTML = appState.page + 1;
  if (appState.page === 0) {
    arrowList[0].classList.add("out");
  }
};
const scrollSize = (size) => {
  window.scroll({
    top: size,
    behavior: "smooth",
  });
};
const filterGamesBtn = async (e) => {
  if (!e.target.classList.contains("btn_category")) {
    return;
  }
  appState.currentCategory = e.target.dataset.category;
  appState.inputSearchValue = null;
  appState.page = 0;
  arrowsBtns.classList.remove("none_anything");

  arrowList[1].classList.remove("out");
  arrowList[0].classList.add("out");
  scrollSize(document.documentElement.clientHeight + 80);
  bntActive(e);
  renderCard(await getdataGamesByAppState());
  numPageInit();
};
const handledSearch = async (e) => {
  e.preventDefault();
  arrowsBtns.classList.remove("none_anything");
  appState.inputSearchValue = null;
  appState.page = 0;
  const inputValue = inputSearch.value.trim();
  appState.inputSearchValue = inputValue;
  if (!inputValue) {
    arrowsBtns.classList.add("none_anything");
    cleanBtns();
    cardsContainer.innerHTML =
      "DEBES INGRESAR AUNQUE SEA 3 LETRAS PARA OBTENER BUENOS RESULTADOS";
    scrollSize(document.documentElement.clientHeight);
    formFilter.reset();
    inputSearch.blur();
    cleanBtns();
    return;
  }
  if ((await getdataGamesByAppState()) === undefined) {
    arrowsBtns.classList.add("none_anything");
    cleanBtns();
    cardsContainer.innerHTML = `<div> <p>Lo siento, no hemos encontrado tu juego...
      intenta con otro nombre o las 3 primeras letras.</p>
      <img src="/img/gamepad-broken-rbg.png" alt="" />
      </div>`;
    formFilter.reset();
    inputSearch.blur();
    cleanBtns();
    scrollSize(document.documentElement.clientHeight + 80);
    return;
  }
  cleanBtns();
  formFilter.reset();
  inputSearch.blur();
  arrowsBtns.classList.remove("none_anything");

  arrowList[1].classList.remove("out");
  arrowList[0].classList.add("out");
  renderCard(await getdataGamesByAppState());
  numPageInit();
  scrollSize(document.documentElement.clientHeight + 80);
};

const loadWindow = async () => {
  const dataGames = await getdataGamesByAppState();
  numPageInit();

  return renderCard(dataGames);
};
const loadDataGamesByPage = async (e) => {
  if (e.target.classList.contains("out")) {
    return;
  }
  if (e.target.dataset.arrow === "right") {
    arrowList[0].classList.remove("out");
    arrowRigth();
    renderCard(await getdataGamesByAppState());
    scrollSize(document.documentElement.clientHeight + 80);
  }
  if (e.target.dataset.arrow === "left") {
    arrowList[1].classList.remove("out");
    arrowLeft();
    renderCard(await getdataGamesByAppState());
    scrollSize(document.documentElement.clientHeight + 80);
  }
};
export const initCards = () => {
  window.addEventListener("DOMContentLoaded", loadWindow());
  btns.addEventListener("click", filterGamesBtn);
  formFilter.addEventListener("submit", handledSearch);
  arrowsBtns.addEventListener("click", loadDataGamesByPage);
};
