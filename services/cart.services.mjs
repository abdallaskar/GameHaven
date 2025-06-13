import Cart from "../models/cart.model.mjs"

export const addToCartService = async (game) => {
    const tempCart = {
        userId: 1,
        items: [
            {
                ...game
            }
        ]
    }
    console.log(tempCart);
    const tempExist = await Cart.findOne({ userId: tempCart.userId });
    if (tempExist) {

        const isInItems = tempExist.items.find((p) => p.gameId === game.gameId);
        if (isInItems) {
            return 'this item is in cart';
        } else {
            const updatedCart = await Cart.findOneAndUpdate(
                { userId: tempCart.userId },
                { $addToSet: { items: game } },
                { new: true, upsert: true }
            );
            return updatedCart;
        }

    } else {
        const addedCart = await Cart.create(tempCart);
        return addedCart;
    }
}

export const getCartItemsForUser = async (id) => {
    const cartItems = await Cart.findOne({ userId: id });
    console.log(cartItems);
    if (!cartItems) {
        return 'Cart Has No Items';
    }
    let totalCost = 0;
    cartItems.items.map((item) => {
        totalCost += (item.quantity * item.productPrice);
    })
    return { items: cartItems.items, totalCost: totalCost };
}

export const addGameQuantityService = async (gameId) => {
    const userId = 1;
    const cartItems = await Cart.findOne({ userId: userId, 'items.gameId': +gameId });
    cartItems.items = cartItems.items.map((item) =>
        item.gameId === +gameId ? { ...item, quantity: item.quantity + 1 } : item
    );
    console.log(cartItems);
    const result = await Cart.findOneAndUpdate({ userId: userId }, cartItems, { new: true });
    return result;
}

export const subtractGameQuantityService = async (gameId) => {
    const userId = 1;
    const cartItems = await Cart.findOne({ userId: userId, 'items.gameId': +gameId });
    cartItems.items = cartItems.items.map((item) =>
        (item.gameId === +gameId && item.quantity !== 1) ? { ...item, quantity: item.quantity - 1 } : item
    );
    console.log(cartItems);
    const result = await Cart.findOneAndUpdate({ userId: userId }, cartItems, { new: true });
    return result;
}