import { table } from "../components/table";

export function renderExchangeRates() {
  const body = `
    <div>
      <h1>Курсы валют</h1>
      <input type="search" class="search" autocomplete="off" placeholder='Поиск'/>
      ${table()}
    </div>
    `;
  const page = document.createElement("div");
  page.innerHTML = body;
  document.body.append(page);
  const searchInput = document.querySelector(".search");
  searchInput.addEventListener("input", () => {
    const value = searchInput?.value.toLowerCase();
    const tb = document.querySelector(".table");
    tb.innerHTML = '';
    const el = `${table(value)}`;
    tb.innerHTML = el;
  });
}
