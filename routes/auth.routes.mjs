import express from 'express';
import { register, login } from '../controllers/auth.controller.mjs';
import { registerSchema, loginSchema } from '../utils/ajvSchemas/auth.schema.mjs';
import validate from '../middlewares/validate.middleware.mjs';

const authRouter = express.Router();
authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);

export default authRouter;
