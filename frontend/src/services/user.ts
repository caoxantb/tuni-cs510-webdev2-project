import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/user";

export const register = async (data: UserRegisterBody): Promise<User> => {
  const res = await axios.post(`${BASE_URL}/register`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const login = async (data: UserLoginBody): Promise<User> => {
  const res = await axios.post(`${BASE_URL}/login`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const logout = async () => {
  await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await axios.get(`${BASE_URL}/current`, { withCredentials: true });
  return res.data;
};

export const getUserByUsername = async (username: string): Promise<User> => {
  const res = await axios.get(`${BASE_URL}/${username}`, {
    withCredentials: true,
  });
  return res.data;
};

export const updateUser = async (
  userId: string,
  data: UserBody,
): Promise<User> => {
  const res = await axios.put(`${BASE_URL}/${userId}`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteUser = async (userId: string) => {
  await axios.delete(`${BASE_URL}/${userId}`, { withCredentials: true });
};
