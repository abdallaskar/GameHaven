import * as GameService from '../services/games.service.mjs';

export const getGames = async (req, res, next) => {
    try {
        const data = await GameService.getGames(req.query);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

export const getGameById = async (req, res, next) => {
    try {
        const game = await GameService.getGameById(req.params.id);
        res.status(200).json(game);
    } catch (err) {
        next(err);
    }
};

export const createGame = async (req, res, next) => {
    try {
        let imageUrl = `/uploads/covers/default-game.jpg`;
        console.log("req.file", req.file);
        console.log("req.body", req.body);
        console.log("req.body.imageUrl", req.body.cover);
        if (req.file) {
            imageUrl = `/uploads/covers/${req.file.filename}`;
        }
        // Add imageUrl to the request body
        const gameData = {
            ...req.body,
            imageUrl: imageUrl
        };
        const newGame = await GameService.createGame(gameData);
        res.status(201).json(newGame);
    } catch (err) {
        console.log("catch error");
        next(err);
    }
};

export const updateGame = async (req, res, next) => {
    try {
        let imageUrl = req.body.imageUrl; // fallback to existing image
        if (req.file) {
            imageUrl = `/uploads/covers/${req.file.filename}`;
        }

        const gameData = {
            ...req.body,
            ...(imageUrl && { imageUrl })
        };

        const updated = await GameService.updateGame(req.params.id, gameData);
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

export const deleteGame = async (req, res, next) => {
    try {
        const game = await GameService.getGameById(req.params.id);

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Check ownership
        if (game.userId.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this game' });
        }

        const result = await GameService.deleteGame(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};


export const addReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const userId = req.user.id;
        const gameId = req.params.id;

        if (typeof rating !== 'number' || rating < 0 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 0 and 5' });
        }

        const review = await GameService.addReviewService(userId, gameId, rating, comment);
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (err) {
        next(err);
    }
};

export const getReviews = async (req, res, next) => {
    try {
        const gameId = req.params.id;
        const reviews = await GameService.getReviewsService(gameId);
        res.json(reviews);
    } catch (err) {
        next(err);
    }
};
