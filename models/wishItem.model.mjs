
import mongoose from "mongoose";


const wishItemSchema = mongoose.Schema({

    userId : { type:mongoose.Schema.Types.ObjectId, required: true, ref:"User"}// must have a User model
    ,
    gameId: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"Game"}


}, {timestamps: true})

const WishItem = mongoose.model('WishItem', wishItemSchema);

export default WishItem;