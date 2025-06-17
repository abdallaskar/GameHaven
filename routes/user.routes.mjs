import express from 'express';
import isAdmin from '../middlewares/isAdmin.middleware.mjs';
import authMiddleware from '../middlewares/auth.middleware.mjs';
import { getAllUsers, getUserById, getMe } from '../controllers/user.controller.mjs';


const userRouter = express.Router();
userRouter.get('/me', authMiddleware, getMe);
userRouter.get('/', authMiddleware, isAdmin, getAllUsers);
userRouter.get('/:id', authMiddleware, isAdmin, getUserById);


export default userRouter;
