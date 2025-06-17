import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true,
      },
      title: { type: String },
      quantity: { type: Number, required: true , min:1 },
      price: { type: Number, required: true,min:0 },
    },
  ],
  totalPrice: { type: Number, required: true,min:0 },
  placedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
