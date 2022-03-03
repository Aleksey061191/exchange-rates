import { getDate } from "./getDate";

function parseToday(s) {
  const parts = s.split("/");
  return parts
    .reverse()
    .map((e) => (e > 9 ? e : "0" + e))
    .join("-");
}

export function widget(start = "", end = "") {
  const today = new Date();
  const maxDate = parseToday(getDate(today));
  return `
    <form class="wgForm">
      <div class="widget">
        <label for="from">From</label>
        <input type="date" ${
          start !== "" ? `value="${start}"` : ""
        } id="from" min="2018-01-01" max=${
    end === "" ? maxDate : `${end}`
  } name="from">
        <label for="to">to</label>
        <input type="date" ${end !== "" ? `value="${end}"` : ""} id="to" min=${
    start === "" ? "2018-01-01" : `${start}`
  } max=${maxDate} name="to">
      </div>
      <div class="btn">
        <button id="submit" type="submit">Submit</button>
      </div>
    </form>
    `;
}

function changeWidget() {
  const startInput = document.getElementById("from");
  const endInput = document.getElementById("to");
  const wg = document.querySelector(".wgForm");
  const startValue = startInput.value;
  const endValue = endInput.value;
  wg.innerHTML = "";
  wg.innerHTML = `${widget(startValue, endValue)}`;
  startInput.addEventListener("change", changeWidget);
  endInput.addEventListener("change", changeWidget);
  listenWidget();
}

export function listenWidget() {
  const startInput = document.getElementById("from");
  const endInput = document.getElementById("to");
  startInput.addEventListener("change", changeWidget);
  endInput.addEventListener("change", changeWidget);
}
