import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/order";

/**
 * Retrieves all orders from the server.
 * @returns {Promise<Order[]>} A promise that resolves to an array of orders.
 */
export const getAllOrders = async (): Promise<Order[]> => {
  const res = await axios.get(BASE_URL, { withCredentials: true });
  return res.data;
};

/**
 * Retrieves the current user's orders.
 * @returns {Promise<Order[]>} A promise that resolves to an array of Order objects.
 */
export const getCurrentUserOrders = async (): Promise<Order[]> => {
  const res = await axios.get(`${BASE_URL}/own`, { withCredentials: true });
  return res.data;
};

/**
 * Retrieves an order by its ID.
 * @param {string} orderId - The ID of the order to retrieve.
 * @returns {Promise<Order>} - A promise that resolves to the retrieved order.
 */
export const getOrderById = async (orderId: string): Promise<Order> => {
  const res = await axios.get(`${BASE_URL}/${orderId}`, {
    withCredentials: true,
  });
  return res.data;
};

/**
 * Creates an order.
 * @param {OrderBody} data - The data for creating the order.
 * @returns {Promise<Order>} The created order.
 */
export const createOrder = async (data: OrderBody): Promise<Order> => {
  const res = await axios.post(BASE_URL, data, { withCredentials: true });
  return res.data;
};
