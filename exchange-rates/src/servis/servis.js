const baseUrl = "https://www.nbrb.by/api/exrates/rates";

export function parseDate(s) {
  const parts = s.split("/");
  return parts.reverse().join("-");
}

export async function getExchangeDynamicsRate(rate, startDate, endDate) {
  const response = await fetch(
    `${baseUrl}/dynamics/${rate}?startDate=${parseDate(
      endDate
    )}&endDate=${parseDate(startDate)}`
  );
  const rez = await response.json();
  return rez;
}


