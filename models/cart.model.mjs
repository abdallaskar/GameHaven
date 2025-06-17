import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    items: [
        {
            gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
            quantity: { type: Number },
            productPrice: { type: Number }
        }
    ],

}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
