import { getGamesFetch } from "./assets/js/api_request";

const init = async () => {
  const data = await getGamesFetch();
  console.log(data);
  //   const a = JSON.stringify(data);
  //   console.log(a);
};
init();
