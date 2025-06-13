import { Router } from "express";
import authMiddleware from '../middlewares/auth.middleware.mjs';
import { addGameQuantity, addGameToCart, getCartItems, subtractGameQuantity } from "../controllers/cart.controller.mjs";

const cartRouter = Router();
// add real user id in all routes  and handle quentites counter
cartRouter.post('/', authMiddleware, async (req, res) => {
    //console.log("-from router-" , req)
    addGameToCart(req, res);
})
// add real user id in all routes 
cartRouter.post('/add/:id', authMiddleware, async (req, res) => {
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