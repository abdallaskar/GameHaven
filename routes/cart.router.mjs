import { Router } from "express";
import authMiddleware from '../middlewares/auth.middleware.mjs';
import {
    addGameQuantity,
    addGameToCart,
    getCartItems,
    subtractGameQuantity,
    clearCart
} from "../controllers/cart.controller.mjs";

const cartRouter = Router();

cartRouter.get('/', authMiddleware, getCartItems);
cartRouter.post('/', authMiddleware, addGameToCart);
cartRouter.post('/add/:id', authMiddleware, addGameQuantity);
cartRouter.post('/sub/:id', authMiddleware, subtractGameQuantity);
cartRouter.delete('/clear', authMiddleware, clearCart);

export default cartRouter;
