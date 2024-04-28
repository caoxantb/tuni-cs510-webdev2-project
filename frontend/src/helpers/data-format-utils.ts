/**
 * Description of function
 * @param {number} num - The number to be parsed and rounded
 * @returns {number} The parsed and rounded number
 */
export const parseIntRound = (num: number) => {
  return Math.round(num * 10) / 10;
};

/**
 * Converts the first character of a string to uppercase and returns the modified string.
 * @param {string} str - The input string.
 * @returns {string} The modified string with the first character in uppercase.
 */
export const toCapitalCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Parses a Date object and returns a formatted string representation.
 * The format of the returned string is "on dd.mm.yyyy at hh:mm".
 *
 * @param date - The Date object to be parsed.
 * @returns A formatted string representation of the input date.
 */
export const parseDate = (date: Date) => {
  const dateStr = date.toLocaleString();
  const [datePart, timePart] = dateStr.split("T");
  const [year, month, day] = datePart.split("-");
  const [time, _] = timePart.split(".");

  return `on ${day}.${month}.${year} at ${time}`;
};
