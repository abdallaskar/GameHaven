import mongoose from "mongoose";
import Cart from "../models/cart.model.mjs"
import Game from "../models/game.model.mjs";

export const addToCartService = async (userId, gameId) => {
    const existingCart = await Cart.findOne({ userId });
    const game = await Game.findOne({ _id: gameId });
    if (!game) {
        return 'Game not found';
    }

    // Initialize quantity and productPrice
    const newGameItem = {
        gameId: new mongoose.Types.ObjectId(gameId), // Ensure ObjectId format
        quantity: 1,
        productPrice: game.price
    };

    if (existingCart) {
        const isInItems = existingCart.items.find(p => p.gameId === gameId);
        if (isInItems) {
            return 'This item is already in the cart';
        }
        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $addToSet: { items: newGameItem } },
            { new: true }
        );
        return updatedCart;
    } else {
        const newCart = await Cart.create({
            userId,
            items: [newGameItem]
        });
        return newCart;
    }
};

export const getCartItemsForUser = async (userId) => {
    const cartItems = await Cart.findOne({ userId });
    if (!cartItems) return 'Cart has no items';

    let totalCost = 0;
    cartItems.items.forEach(item => {
        totalCost += item.quantity * item.productPrice;
    });

    return { items: cartItems.items, totalCost };
};

export const addGameQuantityService = async (userId, gameId) => {
    const cart = await Cart.findOne({
        userId: new mongoose.Types.ObjectId(userId),
        'items.gameId': new mongoose.Types.ObjectId(gameId)
    });

    if (!cart) return 'Cart not found';

    cart.items = cart.items.map(item =>
        item.gameId.equals(gameId) ? { ...item.toObject(), quantity: item.quantity + 1 } : item
    );

    const result = await Cart.findOneAndUpdate(
        { userId },
        { items: cart.items },
        { new: true }
    );

    return result;

};

export const subtractGameQuantityService = async (userId, gameId) => {
    const cart = await Cart.findOne({
        userId: new mongoose.Types.ObjectId(userId),
        'items.gameId': new mongoose.Types.ObjectId(gameId)
    });

    if (!cart) return 'Cart not found';

    cart.items = cart.items.map(item =>
        item.gameId.equals(gameId) && item.quantity > 1
            ? { ...item.toObject(), quantity: item.quantity - 1 }
            : item
    );

    const result = await Cart.findOneAndUpdate(
        { userId },
        { items: cart.items },
        { new: true }
    );

    return result;
};

export const clearCartService = async (userId) => {
    const result = await Cart.findOneAndUpdate({ userId }, { items: [] }, { new: true });
    return result || { message: "Cart was already empty" };
};
