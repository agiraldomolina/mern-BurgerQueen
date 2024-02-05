import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import producRoutes from './routes/product.route.js';
import orderRoutes from './routes/order.route.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';

dotenv.config();

console.log('from index: '+ process.env.MONGO)

connectDB();

const app = express();

app.use(express.json());

//To allow broser to extract token from cookie
app.use(cookieParser());

const whiteList = ['http://localhost:8080', 'http://localhost:5173','http://localhost:5174']

const corsOptions = {
    origin: whiteList,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.listen(8080, () => {
    console.log('Server running on port 8080');
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', producRoutes)
app.use('/api/order', orderRoutes)

app.use(errorHandlerMiddleware);