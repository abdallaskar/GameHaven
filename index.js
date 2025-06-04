import express from 'express';
import cartRouter from './routes/cart.router.mjs';
import { connectDB } from './db/configurationDB.mjs';

const app = express();
app.use(express.json());

app.use('/cart', cartRouter);

connectDB().then(
    () => {
        app.listen('8080', () => {
            console.log('server started');
        })
    }
)