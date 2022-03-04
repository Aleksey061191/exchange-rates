import { search } from "./search";

export function table(value = "", tabelStore) {
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
    ${tabelStore.date
      .map((data, index) => {
        return `
        <tr>
          <td class="data">${data}</td>
          ${
            searchData.includes("USD")
              ? `<td class="${
                tabelStore.usd[index] === tabelStore.minmMaxUsd.max
                    ? "max"
                    : tabelStore.usd[index] === tabelStore.minmMaxUsd.min
                    ? "min"
                    : ""
                }">${tabelStore.usd[index]}</td>`
              : ""
          }
          ${
            searchData.includes("EUR")
              ? `<td class="${
                tabelStore.eur[index] === tabelStore.minmMaxEur.max
                    ? "max"
                    : tabelStore.eur[index] === tabelStore.minmMaxEur.min
                    ? "min"
                    : ""
                }">${tabelStore.eur[index]}</td>`
              : ""
          }
          ${
            searchData.includes("RUB")
              ? `<td class="${
                tabelStore.rub[index] === tabelStore.minmMaxRub.max
                    ? "max"
                    : tabelStore.rub[index] === tabelStore.minmMaxRub.min
                    ? "min"
                    : ""
                }">${tabelStore.rub[index]}</td>`
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
