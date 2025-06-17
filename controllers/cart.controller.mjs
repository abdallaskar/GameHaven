import { addGameQuantityService, addToCartService, getCartItemsForUser, subtractGameQuantityService, clearCartService } from "../services/cart.services.mjs";


export const addGameToCart = async (req, res) => {
    const gameData = req.body;
    const userId = req.user.id;
    const result = await addToCartService(userId, gameData);
    res.status(200).send(result);

}

export const getCartItems = async (req, res) => {
    //[TODO] : handle user id to get from jwt token
    //const userId = req.body.userId;
    const userId = req.user.id;

    const result = await getCartItemsForUser(userId);
    res.status(200).send(result);
}

export const addGameQuantity = async (req, res) => {
    const gameId = req.params.id;
    const userId = req.user.id;
    const result = await addGameQuantityService(userId, gameId);
    res.send(result);
}

export const subtractGameQuantity = async (req, res) => {
    const gameId = req.params.id;
    const userId = req.user.id;
    const result = await subtractGameQuantityService(userId, gameId);
    res.send(result);
}

export const clearCart = async (req, res) => {
    const userId = req.user.id;
    const result = await clearCartService(userId);
    res.send(result);
};
