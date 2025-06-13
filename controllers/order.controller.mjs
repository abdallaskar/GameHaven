import { validationResult } from "express-validator";

import { getAllOrders, getOrderById, createOrder } from "../services/order.service.mjs";

export const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAnOrder = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  try {
    const order = await createOrder(req.body);

    res.status(201).json({ data: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
