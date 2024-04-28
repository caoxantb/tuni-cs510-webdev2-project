import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/user";

/**
 * Registers a new user on the server.
 * @param {UserRegisterBody} data - The data of the user to register
 * @returns Promise containing the registered User object
 */
export const register = async (data: UserRegisterBody): Promise<User> => {
  const res = await axios.post(`${BASE_URL}/register`, data, {
    withCredentials: true,
  });
  return res.data;
};

/**
 * Logs in an existing user.
 * @param {UserLoginBody} data - The login credentials of the user
 * @returns Promise containing the logged-in User object
 */
export const login = async (data: UserLoginBody): Promise<User> => {
  const res = await axios.post(`${BASE_URL}/login`, data, {
    withCredentials: true,
  });
  return res.data;
};

/**
 * Logs out the current user.
 */
export const logout = async () => {
  await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
};

/**
 * Retrieves the currently logged-in user from the server.
 * @returns Promise containing the current User object
 */
export const getCurrentUser = async (): Promise<User> => {
  const res = await axios.get(`${BASE_URL}/current`, { withCredentials: true });
  return res.data;
};

/**
 * Retrieves a user by username from the server.
 * @param {string} username - The username of the user to retrieve
 * @returns Promise containing the User object with the given username
 */
export const getUserByUsername = async (username: string): Promise<User> => {
  const res = await axios.get(`${BASE_URL}/${username}`, {
    withCredentials: true,
  });
  return res.data;
};

/**
 * Updates a user's information on the server.
 * @param {string} userId - The ID of the user to update
 * @param {UserBody} data - The updated data of the user
 * @returns Promise containing the updated User object
 */
export const updateUser = async (
  userId: string,
  data: UserBody,
): Promise<User> => {
  const res = await axios.put(`${BASE_URL}/${userId}`, data, {
    withCredentials: true,
  });
  return res.data;
};

/**
 * Deletes a user from the server.
 * @param {string} userId - The ID of the user to delete
 */
export const deleteUser = async (userId: string) => {
  await axios.delete(`${BASE_URL}/${userId}`, { withCredentials: true });
};
