import * as userService from "../services/wishlist.service.mjs";
import mongoose from "mongoose";

export async function getWishlistByUserId(req, res, next) {
  if (!req.user.id)
    return res.status(401).json({ message: "Unauthorized user" });
  const userId = req.user.id;
  console.log("inside the getwish", req.user, userId);
  if (!mongoose.Types.ObjectId.isValid(userId))
    throw new Error("Not a valid userId");
  try {
    const wishlist = await userService.getWishlistById(userId);
    res.status(200).json({ wishlist: wishlist });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function addWishItem(req, res, next) {
  const userId = req.user.id;
  const { gameId } = req.body;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or missing userId" });
  }

  if (!gameId || !mongoose.Types.ObjectId.isValid(gameId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or missing gameId" });
  }

  try {
    const wishItem = await userService.addWishItem(userId, gameId);
    res
      .status(201)
      .json({ success: true, message: "Wish item is dded", data: wishItem });
  } catch (error) {
    next(error);
  }
}
