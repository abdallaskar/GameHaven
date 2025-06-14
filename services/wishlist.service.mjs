import WishItem from "../models/wishItem.model.mjs";
import Game from "../models/game.model.mjs";
import mongoose from "mongoose";

export async function getWishlistById(userId) {
  try {
    if (!userId) throw new Error("userId must be provided");
    const wishList = await WishItem.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "games",
          localField: "gameId",
          foreignField: "_id",
          as: "game",
        },
      },
      { $unwind: "$game" },
      {
        $group: {
          _id: "$userId",
          games: { $push: "$game" },
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          games: 1,
        },
      },
    ]).exec();
    if (wishList.length === 0)
      throw new Error("No wishlist found for this user");
    return wishList[0];
  } catch (error) {
    throw error;
  }
}


export async function addWishItem(userId, gameId) {
  try {
    const gameExists = await Game.exists({ _id: gameId });
    if (!gameExists) throw new Error("Game does not exist");

    const exists = await WishItem.findOne({ userId, gameId });
    if (exists) throw new Error("Game already in wishlist");

    const newWishItem = new WishItem({ userId, gameId });
    return await newWishItem.save();
  } catch (error) {
    throw error;
  }
}
