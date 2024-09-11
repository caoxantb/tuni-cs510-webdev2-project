import axios from "axios";

const BASE_URL = "https://server-a.fly.dev/api/v1/sandwich";

/**
 * Retrieves all sandwiches from the server.
 * @returns Promise containing an array of Sandwich objects
 */
export const getAllSandwiches = async (): Promise<Sandwich[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

/**
 * Retrieves a sandwich by its ID from the server.
 * @param {string} sandwichId - The ID of the sandwich to retrieve
 * @returns Promise containing the Sandwich object with the given ID
 */
export const getSandwichById = async (
  sandwichId: string,
): Promise<Sandwich> => {
  const res = await axios.get(`${BASE_URL}/${sandwichId}`);
  return res.data;
};

/**
 * Creates a new sandwich on the server.
 * @param {Sandwich} data - The data of the sandwich to create
 * @returns Promise containing the created Sandwich object
 */
export const createSandwich = async (data: Sandwich): Promise<Sandwich> => {
  const res = await axios.post(BASE_URL, data, { withCredentials: true });
  return res.data;
};

/**
 * Updates a sandwich on the server.
 * @param {string} sandwichId - The ID of the sandwich to update
 * @param {SandwichBody} data - The updated data of the sandwich
 * @returns Promise containing the updated Sandwich object
 */
export const updateSandwich = async (
  sandwichId: string,
  data: SandwichBody,
): Promise<Sandwich> => {
  const res = await axios.put(`${BASE_URL}/${sandwichId}`, data, {
    withCredentials: true,
  });
  return res.data;
};

/**
 * Deletes a sandwich from the server.
 * @param {string} sandwichId - The ID of the sandwich to delete
 */
export const deleteSandwich = async (sandwichId: string) => {
  await axios.delete(`${BASE_URL}/${sandwichId}`, {
    withCredentials: true,
  });
};
