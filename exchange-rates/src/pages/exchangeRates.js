import { store } from "../components/getDate";
import { listenSearch } from "../components/search";
import { table } from "../components/table";
import { listenWidget, widget } from "../components/widget";

export function renderExchangeRates() {
  const body = `
    <div>
      <h1>Курсы валют</h1>
      <input type="search" class="search" autocomplete="off" placeholder='Поиск'/>
      ${table('', store)}
      ${widget()}
    </div>
    `;
  const page = document.createElement("div");
  page.innerHTML = body;
  document.body.append(page);
  listenSearch();
  listenWidget();
}
