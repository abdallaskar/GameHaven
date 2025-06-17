import {
  getAllOrders,
  getOrderById,
  createOrder,
} from "../services/order.service.mjs";

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
  try {
    const order = await createOrder(req.user.id);

    res.status(201).json({ message: "Ordered Seccessfully", data: order });
  } catch (error) {
    console.error("Order creation Failed", error);
    res.status(500).json({ error: error.message });
  }
};
