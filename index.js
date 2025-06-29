import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectMongoDB from "./db/configurationDB.mjs"
import gamesRoutes from './routes/games.routes.mjs';
import wishlistRouter from './routes/wishlist.routes.mjs';
import authRouter from './routes/auth.routes.mjs';
import orderRouter from "./routes/order.routes.mjs";

import errorHandler from './middlewares/error.middleware.mjs';
import cartRouter from './routes/cart.router.mjs';
import userRouter from './routes/user.routes.mjs';


// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load .env variables
dotenv.config();
const PORT = process.env.PORT;


// Create Express app
const app = express();


// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', authRouter);
app.use("/user", userRouter);
app.use('/games', gamesRoutes);
app.use('/cart', cartRouter);
app.use('/user', wishlistRouter);
app.use("/user", orderRouter);


// 404 handler root
app.use("/", (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});



// Connect to data base and listen server on port 
connectMongoDB(process.env.MONGO_URI).then(
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
);

// Error handler middleware
app.use(errorHandler);





