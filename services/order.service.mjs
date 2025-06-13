import Order from "../models/order.model.mjs";

export const getAllOrders = async () => {
  return await Order.find();
};

export const getOrderById = async (id) => {
  return await Order.findById(id);
};

export const createOrder = async (orderData) => {
  return await Order.create(orderData);
};
