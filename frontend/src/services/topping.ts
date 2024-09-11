import axios from "axios";

const BASE_URL = "https://server-a.fly.dev/api/v1/topping";

/**
 * Retrieves all toppings from the server.
 * @returns Promise containing an array of Topping objects
 */
export const getAllToppings = async (): Promise<Topping[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};
