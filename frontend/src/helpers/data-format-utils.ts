export const parseIntRound = (num: number) => {
  return Math.round(num * 10) / 10;
};

export const toCapitalCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}