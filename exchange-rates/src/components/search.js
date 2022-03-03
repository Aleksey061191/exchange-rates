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
