import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    rating: {
        type: Number,
        required: true, min: 0, max: 5
    },
    comment: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date, default: Date.now
    }
}, { _id: true });

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, trim: true
    },
    platform: {
        type: String,
        required: true, trim: true
    },
    genre: {
        type: String,
        required: true, trim: true
    },
    description: {
        type: String, trim: true
    },
    price: {
        type: Number,
        required: true, min: 0
    },
    stock: {
        type: Number,
        required: true, min: 0
    },
    imageUrl: {
        type: String, required: true
    },
    reviews: [reviewSchema]
},
    { timestamps: true });

const Game = mongoose.model('Game', gameSchema);
export default Game;
