import { Router } from "express";
import { addGameQuantity, addGameToCart, getCartItems, subtractGameQuantity } from "../controllers/cart.controller.mjs";

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    //console.log("-from router-" , req)
    addGameToCart(req, res);
})
cartRouter.post('/add/:id', async (req, res) => {
    //console.log("-from router-" , req)
    addGameQuantity(req, res);
})
cartRouter.post('/sub/:id', async (req, res) => {
    //console.log("-from router-" , req)
    subtractGameQuantity(req, res);
})

cartRouter.get('/', async (req, res) => {
    //console.log("-from router-" , req)
    getCartItems(req, res);
})

export default cartRouter;