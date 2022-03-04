import { getExchangeDynamicsRate } from "../servis/servis";

export const getDate = (date) => {
  const currentDate = date.toLocaleDateString("en-US");
  const changeDate = currentDate.split("/");
  const rez = `${changeDate[1]}/${changeDate[0]}/${changeDate[2]}`;
  return rez;
};

export function getLastDayOfMonth(year, month) {
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

const array = getArrayDate();
const currency = [431, 451, 456];
const usd = await getExchangeDynamicsRate(
  currency[0],
  array[0],
  array[array.length - 1]
).then((e) => e.map((a) => a.Cur_OfficialRate));

const eur = await getExchangeDynamicsRate(
  currency[1],
  array[0],
  array[array.length - 1]
).then((e) => e.map((a) => a.Cur_OfficialRate));

const rub = await getExchangeDynamicsRate(
  currency[2],
  array[0],
  array[array.length - 1]
).then((e) => e.map((a) => a.Cur_OfficialRate));

export function minMax(arr) {
  arr.sort((a, b) => b - a);
  return {
    min: arr[arr.length - 1],
    max: arr[0],
  };
}

export const store = {
  date: getArrayDate(),
  usd: usd,
  eur: eur,
  rub: rub,
  minmMaxUsd: minMax(usd),
  minmMaxEur: minMax(eur),
  minmMaxRub: minMax(rub),
};
