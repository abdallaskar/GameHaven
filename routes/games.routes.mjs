import express from 'express';
import * as GameController from '../controllers/games.controller.mjs';
import validate from '../middlewares/validate.middleware.mjs';
import gameSchema from '../utils/ajvSchemas/game.schema.mjs';
import upload from '../middlewares/upload.middleware.mjs';
import authMiddleware from '../middlewares/auth.middleware.mjs';
import isAdmin from '../middlewares/isAdmin.middleware.mjs';

const router = express.Router();

//  Public Routes
router.get('/', GameController.getGames);          // GET /games
router.get('/:id', GameController.getGameById);    // GET /games/:id

//  Admin Routes (Protected)
router.post(
    '/',
    authMiddleware,
    isAdmin,
    upload.single('cover'),
    validate(gameSchema),
    GameController.createGame
);

router.put(
    '/:id',
    authMiddleware,
    isAdmin,
    upload.single('cover'),
    validate(gameSchema),
    GameController.updateGame
);

router.delete(
    '/:id',
    authMiddleware,
    isAdmin,
    GameController.deleteGame
);

export default router;
