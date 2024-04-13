import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/sandwich";

export const getAllSandwiches = async (): Promise<Sandwich[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const getSandwichById = async (
  sandwichId: string
): Promise<Sandwich> => {
  const res = await axios.get(`${BASE_URL}/${sandwichId}`);
  return res.data;
};

export const createSandwich = async (data: Sandwich): Promise<Sandwich> => {
  const res = await axios.post(BASE_URL, data, { withCredentials: true });
  return res.data;
};

export const updateSandwich = async (
  sandwichId: string,
  data: SandwichBody
): Promise<Sandwich> => {
  const res = await axios.put(`${BASE_URL}/${sandwichId}`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteSandwich = async (sandwichId: string) => {
  await axios.delete(`${BASE_URL}/${sandwichId}`, {
    withCredentials: true,
  });
};
