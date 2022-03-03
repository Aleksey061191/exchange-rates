import { getExchangeDynamicsRate } from "../servis/servis";

export const getDate = (date) => {
  const currentDate = date.toLocaleDateString("en-US");
  const changeDate = currentDate.split("/");
  const rez = `${changeDate[1]}/${changeDate[0]}/${changeDate[2]}`;
  return rez;
};

function getLastDayOfMonth(year, month) {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}

export function getArrayDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  const arr = [];
  for (let i = 1; i < 8; i++) {
    if (date.getDate === 1) {
      arr.push(getDate(date));
      if (month === 0) {
        year = year - 1;
        month = 11;
      } else {
        month = month - 1;
      }
      day = getLastDayOfMonth(year, month);
      date = new Date(year, month, day);
    } else {
      arr.push(getDate(date));
      day = day - 1;
      date = new Date(year, month, day);
    }
  }
  return arr;
}

const getRates = (currency = [431, 451, 456], array = getArrayDate()) => {
  currency.map((curr) => {
    getExchangeDynamicsRate(curr, array[0], array[array.length - 1])
      .then((e) => e.map((a) => a.Cur_OfficialRate))
      .then((data) => {
        if (curr === 431) {
          localStorage.setItem(`usd`, JSON.stringify(data));
        }
        if (curr === 451) {
          localStorage.setItem(`eur`, JSON.stringify(data));
        }
        if (curr === 456) {
          localStorage.setItem(`rub`, JSON.stringify(data));
        }
      });
  });
};
getRates();

function minMax(currName) {
  if (localStorage.getItem(currName)) {
    const arr = JSON.parse(localStorage.getItem(currName)).sort(
      (a, b) => b - a
    );
    return {
      min: arr[arr.length - 1],
      max: arr[0],
    };
  } else {
    return {
      min: 0,
      max: 0,
    };
  }
}

export const store = {
  date: getArrayDate(),
  usd: localStorage.getItem("usd")
    ? JSON.parse(localStorage.getItem("usd"))
    : [],
  eur: localStorage.getItem("eur")
    ? JSON.parse(localStorage.getItem("eur"))
    : [],
  rub: localStorage.getItem("rub")
    ? JSON.parse(localStorage.getItem("rub"))
    : [],
  minmMaxUsd: minMax("usd"),
  minmMaxEur: minMax("eur"),
  minmMaxRub: minMax("rub"),
};
