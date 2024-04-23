export const parseIntRound = (num: number) => {
  return Math.round(num * 10) / 10;
};

export const toCapitalCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const parseDate = (date: Date) => {
  const dateStr = date.toLocaleString();
  const [datePart, timePart] = dateStr.split("T");
  const [year, month, day] = datePart.split("-");
  const [time, _] = timePart.split(".");

  return `on ${day}.${month}.${year} at ${time}`;
};
