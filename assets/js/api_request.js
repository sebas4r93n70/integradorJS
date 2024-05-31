export const gamesFetch = async () => {
  try {
    const res = await fetch("/assets/dataBase/dataBaseGames.json");
    const data = await res.json();
    let dataArreglo = [...data];
    // const dar = dataArreglo.map((dato) => dato.genre);
    // const setDar = new Set(dar);
    // console.log(setDar);
    return data;
  } catch (error) {
    console.error(`Hubo un error ${error}`);
  }
};
