import * as AuthService from '../services/auth.service.mjs';

export const register = async (req, res, next) => {
    try {
        const newUser = await AuthService.register(req.body);
        res.status(201).json({
            message: "User registered successfully",
            data: newUser
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const result = await AuthService.login(req.body);
        res.status(200).json({
            message: "Login successful",
            token: result.token,
            user: result.user
        });
    } catch (err) {
        next(err);
    }
};