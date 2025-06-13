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
export const createGame = async (data, imageUrl) => {
    const game = await Game.create({ ...data, imageUrl });
    return game;
};

/**
 * Admin: Update game details by ID.
 */
export const updateGame = async (id, data, imageUrl) => {
    const updatedGame = await Game.findByIdAndUpdate(
        id,
        { ...data, ...(imageUrl && { imageUrl }) },
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
