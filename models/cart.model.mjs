import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    items: [
        {
            gameId: { type: mongoose.Schema.Types.Mixed },
            quantity: { type: Number },
            productPrice: { type: Number }
        }
    ],

}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
