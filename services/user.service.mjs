
import User from '../models/user.model.mjs';

export const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
}

export const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
}