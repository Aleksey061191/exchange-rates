import { getExchangeDynamicsRate } from "../servis/servis";
import { getLastDayOfMonth, minMax } from "./getDate";

const joinDate = (year, month, day) => {
  const rez = `${day}/${month}/${year}`;
  return rez;
};

function getArrayDinamicDate(start, end) {
  const startDate = start.split("-");
  const endDate = end.split("-");
  let year = +startDate[0];
  let month = +startDate[1];
  let day = +startDate[2];
  const arr = [];
  while (
    (day >= +endDate[2] || (month > +endDate[1] && day <= +endDate[2]) || (year > +endDate[0] && month <= +endDate[1] && day <= +endDate[2])) &&
    (month >= +endDate[1] || (year > +endDate[0] && month <= +endDate[1])) &&
    year >= +endDate[0]
  ) {
    if (day === 1) {
      arr.push(joinDate(year, month, day));
      if (month === 1) {
        year = year - 1;
        month = 12;
      } else {
        month = month - 1;
      }
      day = getLastDayOfMonth(year, month - 1);
    } else {
      arr.push(joinDate(year, month, day));
      day = day - 1;
    }
  }
  return arr;
}

export const getDinamicRates = async (start, end) => {
  const currency = [431, 451, 456];
  const usd = await getExchangeDynamicsRate(currency[0], end, start).then((e) =>
    e.map((a) => a.Cur_OfficialRate)
  );

  const eur = await getExchangeDynamicsRate(currency[1], end, start).then((e) =>
    e.map((a) => a.Cur_OfficialRate)
  );

  const rub = await getExchangeDynamicsRate(currency[2], end, start).then((e) =>
    e.map((a) => a.Cur_OfficialRate)
  );
  return {
    date: getArrayDinamicDate(end, start),
    usd: usd,
    eur: eur,
    rub: rub,
    minmMaxUsd: minMax(usd),
    minmMaxEur: minMax(eur),
    minmMaxRub: minMax(rub),
  };
};
