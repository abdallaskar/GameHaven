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
        const newGame = await GameService.createGame(req.body, req.body.imageUrl);
        res.status(200).status(201).json(newGame);
    } catch (err) {
        console.log("catch error");
        next(err);
    }
};

export const updateGame = async (req, res, next) => {
    try {
        const imageUrl = req.file?.path;
        const updated = await GameService.updateGame(req.params.id, req.body, imageUrl);
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

export const deleteGame = async (req, res, next) => {
    try {
        const result = await GameService.deleteGame(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
