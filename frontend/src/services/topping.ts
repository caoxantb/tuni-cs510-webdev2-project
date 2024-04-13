import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/topping";

export const getAllToppings = async (): Promise<Topping> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};
