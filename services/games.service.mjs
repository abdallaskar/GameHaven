import mongoose from 'mongoose';
import Game from '../models/game.model.mjs';

/**
 * Get a paginated, filterable list of games.
 * Supports query: ?page=1&limit=10&genre=RPG&platform=PC&search=keyword
 */
export const getGames = async (query) => {
    const { page = 1, limit = 10, genre, platform, search } = query;

    const filter = {};
    if (genre) filter.genre = genre;
    if (platform) filter.platform = platform;
    if (search) {
        filter.title = { $regex: search, $options: 'i' };
    }

    const games = await Game.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const total = await Game.countDocuments(filter);

    return {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        results: games
    };
};

/**
 * Get full details of a single game by ID.
 */
export const getGameById = async (id) => {
    const game = await Game.findById(id);
    if (!game) {
        const error = new Error('Game not found');
        error.status = 404;
        throw error;
    }
    return game;
};

/**
 * Admin: Add a new game.
 */
export const createGame = async (data) => {
    const game = await Game.create(data);
    return game;
};

/**
 * Admin: Update game details by ID.
 */
export const updateGame = async (id, data) => {
    const updatedGame = await Game.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );

    if (!updatedGame) {
        const error = new Error('Game not found');
        error.status = 404;
        throw error;
    }

    return updatedGame;
};

/**
 * Admin: Delete a game by ID.
 */
export const deleteGame = async (id) => {
    const deleted = await Game.findByIdAndDelete(id);
    if (!deleted) {
        const error = new Error('Game not found');
        error.status = 404;
        throw error;
    }
    return { message: 'Game deleted successfully' };
};

export const addReviewService = async (userId, gameId, rating, comment) => {
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
        throw new Error('Invalid game ID');
    }

    const game = await Game.findById(gameId);
    if (!game) {
        const error = new Error('Game not found');
        error.status = 404;
        throw error;
    }

    const alreadyReviewed = game.reviews.find(r => r.userId.toString() === userId);
    if (alreadyReviewed) {
        const error = new Error('You have already reviewed this game');
        error.status = 400;
        throw error;
    }

    const review = {
        userId,
        rating,
        comment,
    };

    game.reviews.push(review);
    await game.save();

    return review;
};

export const getReviewsService = async (gameId) => {
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
        const error = new Error('Invalid game ID');
        error.status = 400;
        throw error;
    }

    const game = await Game.findById(gameId).populate('reviews.userId', 'username');

    if (!game) {
        const error = new Error('Game not found');
        error.status = 404;
        throw error;
    }

    return game.reviews;
};