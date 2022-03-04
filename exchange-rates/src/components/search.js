import { store } from "./getDate";
import { table } from "./table";

export const dataCur = ["USD", "EUR", "RUB"];

let searchCurr = dataCur.map((e) => e);

export function search(value) {
  if (value !== "") {
    searchCurr = dataCur.filter((e) => e.toLowerCase().includes(value));
  } else {
    searchCurr = dataCur.map((e) => e);
  }
  return searchCurr;
}

export function listenSearch() {
  const searchInput = document.querySelector(".search");
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const tb = document.querySelector(".table");
    tb.innerHTML = '';
    tb.innerHTML = `${table(value, store)}`;
  });
}
