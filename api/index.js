import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import producRoutes from './routes/product.route.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
});

const app = express();

app.use(express.json());

//To allow broser to extract token from cookie
app.use(cookieParser());

app.listen(8080, () => {
    console.log('Server running on port 8080');
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', producRoutes)

app.use(errorHandlerMiddleware);