import { store } from "./getDate";
import { search } from "./search";

export function table(value = "") {
  const searchData = search(value);
  return `
  <table class="table">
    <thead>
        <th></th>
        ${searchData
          .map((data) => {
            return `<th>${data}</th>`;
          })
          .join(" ")}
    </thead>
    <tbody>
    ${store.date
      .map((data, index) => {
        return `
        <tr>
          <td class="data">${data}</td>
          ${
            searchData.includes("USD")
              ? `<td class="${
                  store.usd[index] === store.minmMaxUsd.max
                    ? "max"
                    : store.usd[index] === store.minmMaxUsd.min
                    ? "min"
                    : ""
                }">${store.usd[index]}</td>`
              : ""
          }
          ${
            searchData.includes("EUR")
              ? `<td class="${
                  store.eur[index] === store.minmMaxEur.max
                    ? "max"
                    : store.eur[index] === store.minmMaxEur.min
                    ? "min"
                    : ""
                }">${store.eur[index]}</td>`
              : ""
          }
          ${
            searchData.includes("RUB")
              ? `<td class="${
                  store.rub[index] === store.minmMaxRub.max
                    ? "max"
                    : store.rub[index] === store.minmMaxRub.min
                    ? "min"
                    : ""
                }">${store.rub[index]}</td>`
              : ""
          }
        </tr>
        `;
      })
      .join(" ")}
    </tbody>
  </table>
  `;
}
