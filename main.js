import { gamesFetch } from "./assets/js/api_request";
var _ = import("lodash");
const cardsContainer = document.querySelector(".cards_container");
const btnCategory = document.querySelectorAll(".btn_category");
const btns = document.querySelector(".btns");
const formFilter = document.querySelector(".form_filter");
const inputSearch = document.querySelector(".input_search");
const numberPage = document.getElementById("number_page");
const arrowsBtns = document.querySelector(".btn_cards_arrows");
const navFilter = document.querySelector(".nav_filter");
const arrow = document.querySelectorAll(".arrow");

// NodeLIST / HTMLCollection to ARRAY

const btnCategoryList = [...btnCategory];
const arrosList = [...arrow];
// CONSOLEOS : )

// App State
const appState = {
  currentCategory: "all",
  page: 0,
  totalPage: null,
  cantCards: 4,
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
const numPage = (number) => {
  return (numberPage.innerHTML = number + 1);
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
  appState.page = 0;
  bntActive(e);
  arrowsBtns.classList.remove("none_anything");
  const dataGamesChunk = (await _).chunk(
    await getGamesByGenre(appState.currentCategory),
    appState.cantCards
  );
  appState.totalPage = dataGamesChunk.length;
  numPage(appState.page);
  document.documentElement.clientHeight;
  scrollSize(document.documentElement.clientHeight);
  console.log(appState);
  return renderCard(dataGamesChunk[appState.page]);
};
const handledSearch = async (e) => {
  e.preventDefault();
  const inputValue = inputSearch.value.trim();
  if (!inputValue) {
    arrowsBtns.classList.add("none_anything");
    cleanBtns();
    cardsContainer.innerHTML =
      "DEBES INGRESAR AUNQUE SEA 3 LETRAS PARA OBTENER BUENOS RESULTADOS";
    scrollSize(document.documentElement.clientHeight);

    return;
  }
  let games = await gamesFetch();
  // let gamesSearch = [];
  let gamesSearch = games.filter((game) =>
    game.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  if (!gamesSearch.length) {
    arrowsBtns.classList.add("none_anything");
    cleanBtns();
    cardsContainer.innerHTML = `<div> <p>Lo siento, no hemos encontrado tu juego... 
    intenta con otro nombre o las 3 primeras letras.</p>
    <img src="/img/gamepad-broken-rbg.png" alt="" />
    </div>`;
    cleanBtns();
    formFilter.reset();
    inputSearch.blur();
    scrollSize(document.documentElement.clientHeight);
    return;
  }

  const dataGamesChunk = (await _).chunk(gamesSearch, appState.cantCards);
  appState.currentCategory = "handled";
  appState.totalPage = gamesSearch.length;
  appState.inputSearchValue = inputValue;
  numPage(appState.page);
  arrowsBtns.classList.remove("none_anything");
  scrollSize(document.documentElement.clientHeight);
  cleanBtns();
  formFilter.reset();
  inputSearch.blur();
  console.log(appState);
  renderCard(dataGamesChunk[appState.page]);
};

const loadWindow = async () => {
  let dataGames = await getGamesByGenre(appState.currentCategory);
  let dataGamesChunk = (await _).chunk(dataGames, appState.cantCards);
  numPage(appState.page);
  appState.totalPage = dataGames.length;
  return renderCard(dataGamesChunk[appState.page]);
};
const loadDataGamesByPage = async (e) => {
  // console.log(e.target);
  if (e.target.classList.contains("out")) {
    return;
  }
  const dataGames = (await _).chunk(
    await getGamesByGenre(appState.currentCategory),
    appState.cantCards
  );
  appState.totalPage = dataGames.length;
  if (
    appState.page + 1 === appState.totalPage &&
    !arrow[1].classList.contains("out")
  ) {
    arrow[1].classList.add("out");
    return;
  }

  if (e.target.dataset.arrow === "right") {
    appState.page += 1;
    renderCard(dataGames[appState.page]);
    numPage(appState.page);
    console.log(appState);
  } else if (e.target.dataset.arrow === "left") {
    console.log("tada");
    appState.page -= 1;
    numPage(appState.page);
  }
};
const init = () => {
  window.addEventListener("DOMContentLoaded", loadWindow());
  btns.addEventListener("click", filterGamesBtn);
  formFilter.addEventListener("submit", handledSearch);
  arrowsBtns.addEventListener("click", loadDataGamesByPage);
};

init();
