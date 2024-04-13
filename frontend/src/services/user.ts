import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/user";

export const register = async (data: UserRegisterBody): Promise<User> => {
  const res = await axios.post(`${BASE_URL}/register`, data);
  return res.data;
};

export const login = async (data: UserLoginBody): Promise<User> => {
  const res = await axios.post(`${BASE_URL}/login`, data);
  return res.data;
};

export const logout = async () => {
  await axios.post(`${BASE_URL}/logout`, { withCredentials: true });
};

export const updateUser = async (
  userId: string,
  data: UserBody
): Promise<User> => {
  const res = await axios.put(`${BASE_URL}/${userId}`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteUser = async (userId: string) => {
  await axios.delete(`${BASE_URL}/${userId}`, { withCredentials: true });
};
