import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/order";

export const getAllOrders = async (): Promise<Order[]> => {
  const res = await axios.get(BASE_URL, { withCredentials: true });
  return res.data;
};

export const getCurrentUserOrders = async (): Promise<Order[]> => {
  const res = await axios.get(`${BASE_URL}/own`, { withCredentials: true });
  return res.data;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const res = await axios.get(`${BASE_URL}/${orderId}`, {
    withCredentials: true,
  });
  return res.data;
};

export const createOrder = async (data: OrderBody): Promise<Order> => {
  const res = await axios.post(BASE_URL, data, { withCredentials: true });
  return res.data;
};
