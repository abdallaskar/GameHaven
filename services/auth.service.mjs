import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.mjs';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "SecretKey";

// Register user
export async function register(userData) {
    const { username, email, password } = userData;

    if (!username || !email || !password) {
        throw new Error("All fields are required");
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    //  password hashing
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    return await newUser.save();
}

// Login user
export async function login({ email, password }) {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Invalid password");
    }

    // Generate token
    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role},
        JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { token, user };
}
