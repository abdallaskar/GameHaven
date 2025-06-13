import { addGameQuantityService, addToCartService, getCartItemsForUser, subtractGameQuantityService } from "../services/cart.services.mjs";


export const addGameToCart = async (req, res) => {
    const gameData = req.body;
    console.log(gameData);
    const result = await addToCartService(gameData);
    res.status(200).send(result);

}

export const getCartItems = async (req, res) => {
    //[TODO] : handle user id to get from jwt token
    //const userId = req.body.userId;
    const userId = 1;
    const result = await getCartItemsForUser(userId);
    console.log(result);
    res.status(200).send(result);
}

export const addGameQuantity = async (req, res) => {
    const gameId = req.params.id;
    //const userId = 1;
    const result = await addGameQuantityService(gameId);
    res.send(result);
}

export const subtractGameQuantity = async (req, res) => {
    const gameId = req.params.id;
    //const userId = 1;
    const result = await subtractGameQuantityService(gameId);
    res.send(result);
}