export const getGamesFetch = async () => {
  try {
    const res = await fetch("/assets/dataBase/dataBaseGames.json");
    const data = await res.json();
    let dataArreglo = [...data];
    console.log(dataArreglo);

    console.log(dataArreglo.map((dato) => dato.genre));
    const dar = dataArreglo.map((dato) => dato.genre);
    const setDar = new Set(dar);
    console.log(setDar);
  } catch (error) {
    console.error(`Hubo un error ${error}`);
  }
};

/*
const dataArreglo = data.map((dato) => {
    if (
      dato.genre === "MMOARPG" ||
      dato.genre === " MMORPG" ||
      dato.genre === "MMO" ||
      dato.genre === "ARPG" ||
      dato.genre === "Action RPG"
    ) {
      dato.genre = "MMORPG";
    } else if (dato.genre === "Action Game") {
      dato.genre = "Action";
    } else if (dato.genre === "Card Game") {
      dato.genre = "Card";
    } else if (dato.genre === "Racing") {
      dato.genre = "Sports";
    } else {
      return;
    }
  });
*/
