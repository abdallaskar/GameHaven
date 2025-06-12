import mongoose from "mongoose";
// user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.Mixed, required: true },
  items: [
    {
      gameId: {
        type: mongoose.Schema.Types.Mixed,
        ref: "Game",
        required: true,
      },
      title: { type: String },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  placedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
