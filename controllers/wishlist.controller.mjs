import * as userService from "../services/wishlist.service.mjs"; 

export async function getWishlistByUserId(req, res){
if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
    const userId = req.userId; 
    if(!mongoose.Types.ObjectId.isValid(userId)) throw new Error("Not a valid userId"); 
    try{
        const wishlist = await userService.getWishlistByUserId(userId); 
        res.status(200).json({wishlist: wishlist})
    }catch(error){
        console.log(error)
        // res.status(500).json({ success: false, message: error.message });
        next(error); 
    }
}

export async function addWishItem(req, res, next) {
  const userId = req.userId; 
  const { gameId } = req.body;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid or missing userId" });
  }

  if (!gameId || !mongoose.Types.ObjectId.isValid(gameId)) {
    return res.status(400).json({ success: false, message: "Invalid or missing gameId" });
  }

  try {
    const wishItem = await userService.addWishItem(userId, gameId);
    res.status(201).json({ success: true, message: "Wish item added", data: wishItem });
  } catch (error) {
    next(error);
  }
}