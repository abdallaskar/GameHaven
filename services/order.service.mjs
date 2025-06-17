import Order from "../models/order.model.mjs";
import Cart from "../models/cart.model.mjs";

export const getAllOrders = async () => {
  return await Order.find();
};

export const getOrderById = async (id) => {
  return await Order.findById(id);
};

export const createOrder = async (userId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is Empty or not found");
  }

  const orderData = {
    user: userId,
    items: cart.items.map((item) => ({
      gameId: item.gameId,
      quantity: item.quantity,
      price: item.productPrice,
    })),
    totalPrice: cart.items.reduce(
      (total, item) => total + item.quantity * item.productPrice,
      0
    ),
  };

  const order = await Order.create(orderData);

  await Cart.deleteOne({ _id: cart._id });

  return order;
};
