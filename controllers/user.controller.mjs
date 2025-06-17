import * as UserService from '../services/user.service.mjs';

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json({
            message: "Users retrieved successfully",
            data: users
        });
    } catch (err) {
        next(err);
    }
};
export const getUserById = async (req, res, next) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User retrieved successfully",
            data: user
        });
    } catch (err) {
        next(err);
    }
};
export const getMe = async (req, res, next) => {
    try {
        const user = await UserService.getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User retrieved successfully",
            data: user
        });
    } catch (err) {
        next(err);
    }
};