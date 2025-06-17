import express from "express";
import { getWishlistByUserId, addWishItem } from "../controllers/wishlist.controller.mjs";
import { wishItemSchema } from "../utils/ajvSchemas/wishlist.schema.mjs";
import validate from "../middlewares/validate.middleware.mjs";
import authMiddleware from "../middlewares/auth.middleware.mjs";

const wishlistRouter = express.Router();
// wishlistRouter.use(authenticate)

wishlistRouter.get("/wishlist", authMiddleware, getWishlistByUserId);
wishlistRouter.post("/wishlist", authMiddleware, validate(wishItemSchema), addWishItem);

export default wishlistRouter; 